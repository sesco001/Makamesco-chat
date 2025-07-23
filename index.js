const socket = io("http://localhost:3000"); // Change to your backend URL after deploy

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

// Send message
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (text !== "") {
    socket.emit("send_message", { text });
    input.value = "";
  }
};

// Receive message
socket.on("receive_message", data => {
  const msg = document.createElement("div");
  msg.textContent = data.text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
});
