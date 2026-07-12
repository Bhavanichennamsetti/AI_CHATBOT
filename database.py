import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

DB_NAME = "chat.db"


def get_db():
    return sqlite3.connect(DB_NAME)


def create_tables():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
)
""")

    cur.execute("""
   CREATE TABLE IF NOT EXISTS conversations(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
""")

    cur.execute("""
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER,
        role TEXT,
        content TEXT
    )
    """)

    conn.commit()
    conn.close()

def create_conversation(user_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("INSERT INTO conversations(user_id,title) VALUES(?,?)", (user_id,"New Chat",))

    conversation_id = cur.lastrowid

    conn.commit()
    conn.close()

    return conversation_id


def save_message(conversation_id, role, content):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO messages(conversation_id,role,content) VALUES(?,?,?)",
        (conversation_id, role, content)
    )

    conn.commit()
    conn.close()


def get_messages(conversation_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """SELECT role,content FROM messages WHERE conversation_id=? ORDER BY id""",
        (conversation_id,)
    )

    rows = cur.fetchall()

    conn.close()

    return [{"role": r[0], "content": r[1]} for r in rows]
def get_conversations(user_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""SELECT id, title FROM conversations WHERE user_id=? ORDER BY id DESC""", (user_id,))

    rows = cur.fetchall()

    conn.close()

    return [{"id": r[0], "title": r[1]} for r in rows]


def update_title(conversation_id, title):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "UPDATE conversations SET title=? WHERE id=?",
        (title, conversation_id)
    )

    conn.commit()
    conn.close()

def delete_conversation(conversation_id):
    conn = get_db()
    cur = conn.cursor()

    # Delete all messages of this conversation
    cur.execute(
        "DELETE FROM messages WHERE conversation_id=?",
        (conversation_id,)
    )

    # Delete the conversation itself
    cur.execute(
        "DELETE FROM conversations WHERE id=?",
        (conversation_id,)
    )

    conn.commit()
    conn.close()
def create_user(username, email, password):

    conn = get_db()
    cur = conn.cursor()

    try:

        hashed_password = generate_password_hash(password)

        cur.execute(
            """
            INSERT INTO users(username,email,password)
            VALUES(?,?,?)
            """,
            (username, email, hashed_password)
        )

        conn.commit()

        return True

    except sqlite3.IntegrityError:

        return False

    finally:

        conn.close()
def login_user(username, password):

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id,username,password
        FROM users
        WHERE username=?
        """,
        (username,)
    )

    user = cur.fetchone()

    conn.close()

    if user and check_password_hash(user[2], password):

        return {
            "id": user[0],
            "username": user[1]
        }

    return None


def get_user(email):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT id,username,email,password FROM users WHERE email=?",
        (email,)
    )

    user = cur.fetchone()

    conn.close()

    return user  
def rename_conversation(conversation_id, title):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "UPDATE conversations SET title=? WHERE id=?",
        (title, conversation_id)
    )

    conn.commit()
    conn.close()
