# 🤖 My AI Chatbot

A modern AI chatbot built with **Python**, **Flask**, **Groq LLM**, **Tavily Web Search**, **SQLite**, **HTML**, **CSS**, and **JavaScript**.

The chatbot provides real-time AI conversations with conversation memory, web search support, user authentication, and a clean ChatGPT-inspired interface.

---

# 🚀 Features

- 🔐 User Login & Signup
- 👤 Multiple User Accounts
- 💬 AI Chat using Groq (Llama 3.3 70B)
- 🌐 Web Search using Tavily API
- 🔍 Web Search ON/OFF Toggle
- 🧠 Conversation Memory
- 💾 Stores Chat History in SQLite
- 📂 Multiple Conversations
- ✏️ Rename Conversations
- 🗑 Delete Conversations
- 🔎 Search Previous Chats
- 🎤 Voice Input (Speech Recognition)
- 📷 Camera Image Upload
- 📎 File Attachment
- 📋 Copy AI Responses
- ✏️ Edit User Messages
- 🌙 Dark / Light Theme
- ⚡ Typing Indicator
- 🔒 Secure Password Hashing
- 📱 Responsive UI
- 🎨 ChatGPT-style Interface

---

# 🛠 Technologies Used

## Backend

- Python
- Flask
- Groq API
- Tavily API
- SQLite
- python-dotenv

## Frontend

- HTML5
- CSS3
- JavaScript

---

# 📂 Project Structure

```
AI-Chatbot/
│
├── app.py
├── database.py
├── chat.db
├── .env
├── requirements.txt
│
├── templates/
│   ├── index.html
│   ├── login.html
│   └── signup.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   └── images/
│
└── README.md
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/your-username/AI-Chatbot.git
```

Go to project folder

```bash
cd AI-Chatbot
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

---

# ▶ Run the Project

```bash
python app.py
```

Open your browser

```
http://127.0.0.1:5000
```

---

# 🧠 Conversation Memory

The chatbot remembers previous messages within the current conversation.

Conversation history is stored in SQLite and automatically sent to the Groq model, allowing the AI to answer based on earlier messages.

---

# 🌐 Web Search

The chatbot supports live internet search using the Tavily API.

- Web Search ON → AI answers using the latest internet information.
- Web Search OFF → AI answers using only its built-in knowledge.

---

# 🔒 Authentication

Users can

- Register
- Login
- Logout

Passwords are securely stored using Werkzeug password hashing.

---

# 📸 Screenshots

Add screenshots here.

Example:

- Login Page
- Home Page
- Chat Screen
- Dark Mode
- Web Search Toggle

---

# 🔮 Future Improvements

- Image Understanding
- PDF Chat
- Streaming AI Responses
- Voice Reply
- Code Syntax Highlighting
- Markdown Rendering
- AI Image Generation
- Export Chats as PDF
- Mobile App
- Docker Deployment

---

# 👨‍💻 Author

**Mounika Chennamsetti**

GitHub:
https://github.com/your-username

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.