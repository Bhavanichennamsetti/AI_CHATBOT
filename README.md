# 🤖 My AI Chatbot

A modern AI chatbot built using **Flask**, **Python**, **HTML**, **CSS**, **JavaScript**, **SQLite**, and the **Groq API**. The chatbot provides a ChatGPT-like interface with conversation history, authentication, chat management, and a responsive user experience.

---

# 📌 Features

### 🔐 User Authentication
- User Signup
- User Login
- Secure Logout
- Password hashing for security

### 💬 AI Chat
- Chat with AI using the Groq API
- Fast AI-generated responses
- Typing indicator while AI is generating a reply
- Error handling for API and network issues

### 📝 Chat Management
- Create New Chat
- Automatically save conversations
- View previous conversations
- Rename conversations
- Delete conversations
- Search previous chats

### 🎨 User Interface
- Dark/Light Theme Toggle
- Responsive Design
- Clean ChatGPT-style interface
- Copy AI responses
- Edit user messages before resending

### 📂 Additional Features
- File Upload Button
- Camera Image Upload Button
- Conversation history stored in SQLite database

---

# 🛠 Technologies Used

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Python
- Flask

## Database
- SQLite

## AI Model
- Groq API
- Llama-3.3-70B-Versatile

---

# 📁 Project Structure

```
AI-Chatbot/
│
├── app.py
├── database.py
├── chat.db
├── requirements.txt
├── README.md
├── .env
│
├── templates/
│   ├── index.html
│   ├── login.html
│   └── signup.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   └── uploads/
│
└── screenshots/
```

---

# ⚙ Installation

## 1. Clone the Repository

```bash
git clone 
```

## 2. Move into the Project Folder

```bash
cd AI-Chatbot
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 4. Create a `.env` File

```env
GROQ_API_KEY=your_groq_api_key
```

## 5. Run the Application

```bash
python app.py
```

## 6. Open in Browser

```
http://127.0.0.1:5000
```

---

# 🚀 How to Use

1. Register a new account.
2. Login using your credentials.
3. Start a new chat.
4. Ask questions to the AI.
5. Rename or delete conversations.
6. Search previous chats.
7. Switch between Dark and Light themes.
8. Logout securely when finished.

---

# 🗄 Database

SQLite stores:

- User Accounts
- Conversation Titles
- Chat Messages
- AI Responses

---

# ✨ Key Features

- Secure Login System
- Persistent Chat History
- AI Response Generation
- Conversation Search
- Rename Conversations
- Delete Conversations
- Dark/Light Mode
- Copy AI Responses
- Edit Messages
- Responsive UI
- Error Handling

---

# 📸 Screenshots

Add screenshots of:

- Login Page
- Signup Page
- Main Chat Screen
- Dark Mode
- Conversation History

---

# 🔮 Future Enhancements

- Voice Input
- Voice Output
- PDF Document Chat
- Image Understanding
- Multiple AI Models
- RAG (Retrieval-Augmented Generation)
- Export Chat History
- User Profile Settings

---

# 👨‍💻 Author

**Mounika Chennamsetti**

---

# 📄 License

This project was developed for educational and academic purposes.