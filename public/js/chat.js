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

socket.on("global-chat-history", (data) => {
    for(let obj of data)
    {
        const msgElem = document.createElement("div");
        if(obj.name == null)
        {
            msgElem.className = "chat-message";
            msgElem.innerHTML = `<span class="chat-info">${obj.message}</span>`;
        }
        else
        {
            msgElem.className = "chat-message";
            msgElem.innerHTML = `<span class="chat-username">${obj.name}:</span> <span class="chat-text">${obj.message}</span>`;
        }
        document.getElementById("chatContainerMenu").appendChild(msgElem);
        msgElem.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    // console.log("Successfull load chat history");
});
