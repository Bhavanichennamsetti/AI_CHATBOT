let conversation_id = null;
let recentChats = [];
let isNewchat = true;

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}
function addRecentChat() {

    const title = message.length > 30
        ? message.substring(0, 30) + "..."
        : message;

    recentChats.unshift({
    id: conversation_id,
    title: title
});
    const recentDiv = document.getElementById("recentChats");

    recentDiv.innerHTML = "";

    recentChats.forEach(chat => {

        recentDiv.innerHTML += `
        <div class="menu-item recent-chat" onclick="openConversation(${chat.id})">
        💬 ${chat.title}
        </div>
        `;

    });

}

async function openConversation(id) {
    console.log("Opening :", id);
    conversation_id = id;
    isNewchat = false;

    const response = await fetch("/conversations/" + id);
    const messages = await response.json();

    console.log(messages);
    console.log(messages[0]);
    console.log(messages[1]);

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    messages.forEach(msg => {
        chatBox.innerHTML += `
        <div class="message ${msg.role}">${msg.content}</div>

        <div class="message-time">
        --
        </div>
        `;
    });
}
async function deleteConversation(id) {
    console.log("Delete clicked:", id);

    if (!confirm("Delete this chat?")) return;

    try {
        const response = await fetch(`/delete/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {

            await loadRecentChats();

            if (conversation_id === id) {
                conversation_id = null;

                const chatBox = document.getElementById("chat-box");
                chatBox.innerHTML = "";
                chatBox.style.display = "none";

                document.querySelector(".welcome").style.display = "block";
            }
        }

    } catch (error) {
        console.error(error);
    }
}

        document.getElementById("chat-box").innerHTML = "";
    
document.getElementById("newChatBtn").addEventListener("click", () => {
     
    conversation_id = null;
    console.log("conversation_id =", conversation_id);
    isNewchat = true;

    document.getElementById("chat-box").innerHTML = "";

    const welcome = 
    document.querySelector(".welcome").style.display = "block";

});

// Attach button
const attachBtn = document.getElementById("attachBtn");
if (attachBtn) {
    attachBtn.onclick = function () {
        document.getElementById("fileInput").click();
    };
}

// Camera button
const cameraBtn = document.getElementById("cameraBtn");
if (cameraBtn) {
    cameraBtn.onclick = function () {
        document.getElementById("cameraInput").click();
    };
}

// Send message
async function sendMessage() {

    const input = document.getElementById("userInput");
    const message = input.value.trim();

     if (message === "") {
        return;
    }
 

    const welcome = document.querySelector(".welcome");
    if (welcome) welcome.style.display = "none";

    const chatBox = document.getElementById("chat-box");

    chatBox.style.display = "block";

    chatBox.innerHTML += `
<div class="message user">
    <div class="user-text">${message}</div>

    <div class="message-footer">
        <span class="message-time">${getCurrentTime()}</span>

        <button class="edit-btn"
            onclick="editMessage(this)">
            ✏️
        </button>
    </div>
</div>
`;

   chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    try {
        chatBox.innerHTML += `
<div class="message bot" id="typingMessage">
    🤖 AI is typing...
</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
    message: message,
    conversation_id: conversation_id,
    web_search: document.getElementById("webSearch").checked
})
        });
       

        const data = await response.json();
        if (!response.ok) {
    chatBox.innerHTML += `
    <div class="message bot">
        ${data.reply}
    </div>
    `;
    return;
}
        const typing = document.getElementById("typingMessage");
if (typing) {
    typing.remove();
}

        if (data.conversation_id) {
    conversation_id = data.conversation_id;

    if (isNewchat) {
        isNewchat = false;
    }

    await loadRecentChats();
}

        chatBox.innerHTML += `
<div class="message bot">

    <div class="bot-text">
        ${data.reply}
    </div>

    <div class="message-time">
        ${getCurrentTime()}
    </div>

    <button class="copy-btn"
        onclick="copyMessage(this)">
        📋 Copy
    </button>

</div>
`;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

    const typing = document.getElementById("typingMessage");
    if (typing) typing.remove();

    let errorMessage = "❌ Something went wrong.";

    if (!navigator.onLine) {
        errorMessage = "🌐 No Internet Connection.";
    } else if (error.name === "TypeError") {
        errorMessage = "🔌 Cannot connect to the server.";
    }

    chatBox.innerHTML += `
        <div class="message bot error">
            ${errorMessage}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    console.error(error);
}
}
// Enter key
document.getElementById("userInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

// Send button
document.getElementById("sendBtn").addEventListener("click", sendMessage);
async function loadRecentChats() {
    const response = await fetch("/conversations");
    recentChats = await response.json();

    const recentDiv = document.getElementById("recentChats");
    recentDiv.innerHTML = "";

    recentChats.forEach(chat => {
        recentDiv.innerHTML += `
        <div class="menu-item recent-chat">

            <span class="chat-title" data-id="${chat.id}">
                💬 ${chat.title}
            </span>

            <span onclick="event.stopPropagation(); renameConversation(${chat.id})">
                ✏️
            </span>

            <span class="delete-chat"
                  onclick="event.stopPropagation(); deleteConversation(${chat.id})">
                🗑️
            </span>

        </div>`;
    });
}


loadRecentChats();
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const search = this.value.toLowerCase();

        const chats = document.querySelectorAll("#recentChats .recent-chat");

        chats.forEach(chat => {
            if (chat.innerText.toLowerCase().includes(search)) {
                chat.style.display = "flex";
            } else {
                chat.style.display = "none";
            }
        });
    });
}
async function renameConversation(id) {

    const title = prompt("Enter new chat name:");

    if (!title) return;

    const response = await fetch(`/rename/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    const data = await response.json();

    if (data.success) {
        loadRecentChats();
    }
}
const themeBtn = document.getElementById("themeBtn");

function loadTheme(){

    const theme = localStorage.getItem("theme");

    if(theme==="dark"){
        document.body.classList.add("dark");
        themeBtn.innerHTML="☀️";
    }else{
        document.body.classList.remove("dark");
        themeBtn.innerHTML="🌙";
    }

}

themeBtn.onclick=function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeBtn.innerHTML="☀️";
    }else{
        localStorage.setItem("theme","light");
        themeBtn.innerHTML="🌙";
    }

}

loadTheme();
function copyMessage(button) {

    const text =
        button.parentElement
        .querySelector(".bot-text")
        .innerText;

    navigator.clipboard.writeText(text);

    button.innerHTML = "✅ Copied";

    setTimeout(() => {
        button.innerHTML = "📋 Copy";
    }, 1500);

}
function editMessage(button){

    const messageBox = button.closest(".message.user");

    const text = messageBox.querySelector(".user-text").innerText;

    document.getElementById("userInput").value = text;

    // Remove the user message
    messageBox.remove();

    // Remove the last AI reply
    const bots = document.querySelectorAll(".message.bot");
    if(bots.length){
        bots[bots.length-1].remove();
    }

    document.getElementById("userInput").focus();
}
const micBtn = document.getElementById("micBtn");

if ("webkitSpeechRecognition" in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.onclick = () => {

        recognition.start();

        micBtn.classList.add("listening");
        micBtn.innerHTML = "🎙️";

    };

    recognition.onresult = (event) => {

        const speech = event.results[0][0].transcript;

        document.getElementById("userInput").value = speech;

    };

    recognition.onend = () => {

        micBtn.classList.remove("listening");
        micBtn.innerHTML = "🎤";

    };

} else {

    micBtn.disabled = true;
    alert("Speech Recognition is not supported in this browser.");

}
const cameraInput = document.getElementById("cameraInput");

cameraInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        const chatBox = document.getElementById("chat-box");

        document.querySelector(".welcome").style.display = "none";
        chatBox.style.display = "block";

        chatBox.innerHTML += `
        <div class="message user">
            <img src="${e.target.result}"
                 style="max-width:250px;
                        border-radius:12px;">
            <div class="message-time">
                ${getCurrentTime()}
            </div>
        </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    };

    reader.readAsDataURL(file);

});
// Library
document.getElementById("libraryBtn").addEventListener("click", function () {
    alert("Library clicked");
});

// Projects
document.getElementById("projectsBtn").addEventListener("click", function () {
    alert("Projects clicked");
});

// Apps
document.getElementById("appsBtn").addEventListener("click", function () {
    alert("Apps clicked");
});

// More
document.getElementById("moreBtn").addEventListener("click", function () {
    alert("More clicked");
});
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {

        if (confirm("Are you sure you want to logout?")) {
            window.location.href = "/logout";
        }

    });
}
