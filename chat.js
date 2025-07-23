const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!user || !token) {
  alert("Please log in first");
  window.location.href = "login.html";
}

const socket = io("http://localhost:3000", {
  auth: { token }
});

const usersList = document.getElementById("users");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let currentChatUser = null;

// Receive full user list
socket.on("online_users", users => {
  usersList.innerHTML = "";
  users.forEach(u => {
    if (u.id !== user.id) {
      const li = document.createElement("li");
      li.textContent = u.email;
      li.style.cursor = "pointer";
      li.onclick = () => {
        currentChatUser = u;
        chatBox.innerHTML = "";
      };
      usersList.appendChild(li);
    }
  });
});

// Receive message
socket.on("private_message", data => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(data.from === user.id ? "own" : "other");
  div.textContent = `${data.fromEmail}: ${data.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Send message
sendBtn.onclick = () => {
  const message = messageInput.value.trim();
  if (message && currentChatUser) {
    socket.emit("private_message", {
      to: currentChatUser.id,
      message
    });

    messageInput.value = "";
  }
};
