from flask import Flask, render_template, request, jsonify,redirect,url_for,session
from groq import Groq
from dotenv import load_dotenv
from database import (create_conversation,create_tables,save_message,get_messages,get_conversations,update_title,delete_conversation,create_user,login_user,rename_conversation)
from  tavily import TavilyClient
import traceback
import os


load_dotenv()
 
print("GROQ:", os.getenv("GROQ_API_KEY"))
print("TAVILY:", os.getenv("TAVILY_API_KEY"))

app = Flask(__name__) 
app.secret_key = "your_secret_key_123"     

create_tables()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


@app.route("/")
def home():
    if "user_id" not in session:
        return redirect(url_for("login"))
    return render_template("index.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/register", methods=["POST"])
def register():

    username = request.form["username"]
    email = request.form["email"]
    password = request.form["password"]

    if create_user(username, email, password):
        return redirect(url_for("login"))

    return "Username or Email already exists."

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/login", methods=["POST"])
def login_post():

    username = request.form["username"]
    password = request.form["password"]

    user = login_user(username, password)

    if user:
        session["user_id"] = user["id"]
        session["username"] = user["username"]   
        return redirect(url_for("home"))

    return "Invalid username or password."


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/conversations")
def conversations():
    if "user_id" not in session:
        return jsonify([])
    return jsonify(get_conversations(session["user_id"]))

@app.route("/conversations/<int:conversation_id>")
def conversation(conversation_id):
    if "user_id" not in session:
        return jsonify([])
    return jsonify(get_messages(conversation_id))

@app.route("/rename/<int:conversation_id>", methods=["POST"])
def rename_chat(conversation_id):

    data = request.get_json()

    rename_conversation(
        conversation_id,
        data["title"]
    )

    return jsonify({"success": True})

@app.route("/delete/<int:conversation_id>", methods=["DELETE"])
def delete_chat(conversation_id):
    if "user_id" not in session:
        return jsonify({"success": False})
    delete_conversation(conversation_id)
    return jsonify({"success": True})

@app.route("/chat", methods=["POST"])
def chat():
    try:
        if "user_id" not in session:
            return jsonify({"reply": "Please login first."}), 401

        data = request.get_json()

        message = data["message"]
        web_search = data.get("web_search", True)
        conversation_id = data.get("conversation_id")

        if conversation_id is None:
            conversation_id = create_conversation(session["user_id"])
            update_title(conversation_id, message[:30])

        # Save user message
        save_message(conversation_id, "user", message)

        # ---------------- WEB SEARCH ----------------
        web_context = ""

        if web_search:
            search_result = tavily.search(
                query=message,
                search_depth="advanced",
                max_results=5
            )

            for result in search_result["results"]:
                web_context += f"""
Title: {result['title']}
URL: {result['url']}
Content: {result['content']}

"""

        # ---------------- GROQ ----------------
        history = get_messages(conversation_id)

        messages = [
            {
                "role": "system",
                "content": f"""
You are a helpful AI assistant.

If web search results are provided, use them to answer accurately.
If no web search results are available, answer using your own knowledge.

Web Search Results:
{web_context}
"""
            }
        ]

        messages.extend(history)

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages
        )

        ai_reply = response.choices[0].message.content

         # Save AI reply
        save_message(conversation_id, "assistant", ai_reply)

        ai_reply = ai_reply.replace("\n", "<br>")

        return jsonify({
            "reply": ai_reply,
            "conversation_id": conversation_id
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            "reply": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
