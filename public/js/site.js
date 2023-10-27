///////// MENU-CHAT /////////
const socket = io();

const chatContainer = document.getElementById("chatContainer");
const inputMessage = document.getElementById("inputMessage");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
    const message = inputMessage.value;
    socket.emit("chat message", message);
    inputMessage.value = "";
});

socket.on("chat message", (msg) => {
    const messageElem = document.createElement("div");
    messageElem.className = "menu-chat-message";
    messageElem.innerHTML = `<span class="menu-chat-username">Player:</span> <span class="menu-chat-text">${msg}</span>`;
    chatContainer.appendChild(messageElem);
    messageElem.scrollIntoView({ block: "center", behavior: "smooth" });
});
///////// MENU-CHAT /////////