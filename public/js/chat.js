socket.on("receiveMessage", (data) => {
    const msgElem = document.createElement("div");
    msgElem.className = "chat-message";
    msgElem.innerHTML = `<span class="chat-username">${data.username}:</span> <span class="chat-text">${data.message}</span>`;
    if(data.type === "menu-chat")
    {
        document.getElementById("chatContainerMenu").appendChild(msgElem);
    }
    else if(data.type === "game-chat")
    {
        document.getElementById("chatContainerGame").appendChild(msgElem);
    }
    msgElem.scrollIntoView({ block: "center", behavior: "smooth" });
});

socket.on("infoMessage", (data) => {
    const msgElem = document.createElement("div");
    msgElem.className = "chat-message";
    msgElem.innerHTML = `<span class="chat-info">${data.message}</span>`;
    if(data.type === "menu-chat")
    {
        document.getElementById("chatContainerMenu").appendChild(msgElem);
    }
    else if(data.type === "game-chat")
    {
        document.getElementById("chatContainerGame").appendChild(msgElem);
    }
    msgElem.scrollIntoView({ block: "center", behavior: "smooth" });
});
