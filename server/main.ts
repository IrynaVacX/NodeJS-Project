import app from "./server";
import { homeRouter } from "./routes/homeRouter";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { globalChatService } from "../services/GlobalChatService";


dotenv.config();

app.use('/', homeRouter);
app.use((req, res) => {
    res.render('main');
});

//////// SERVER RUN ////////
const server = app.listen(Number(process.env.PORT), () => {
    console.log("Server ready at: ", `http://localhost:${process.env.PORT}/`);
});

////// CREATE SESSION //////
const io = new Server(server);
let usernames = [];

io.on("connection", (socket) => {

    // join to global game chat
    socket.on("menu-chat", async (username) => {
        socket.join("menu-chat");
        try {
            let rows = await globalChatService.getMessagesAsArray();
            if (rows !== null) {
                io.to("menu-chat").emit("global-chat-history", rows);
            }
        }
        catch (err) {
            console.error("Error fetching chat history : ", err);
        };
        usernames[socket.id] = username;
        try {
            let addResult = await globalChatService.addNewMessage(null, `${usernames[socket.id]} joined the chat`);
            if (addResult) {
                io.to("menu-chat").emit("infoMessage", { message: `${usernames[socket.id]} joined the chat`, type: "menu-chat" });
            }
        }
        catch (err) {
            console.error("Error sending chat message : ", err);
        };
    });


    // send messages to menu chat
    socket.on("sendMessageMenu", async (message) => {
        try {
            let addResult = await globalChatService.addNewMessage(usernames[socket.id], message);
            if (addResult) {
                io.to("menu-chat").emit("receiveMessage", { username: usernames[socket.id], message: message, type: "menu-chat" });
            }
        }
        catch (err) {
            console.error("Error sending chat message : ", err);
        };
    });
    // disconnect from menu chat
    socket.on("disconnect", async () => {
        try {
            let addResult = await globalChatService.addNewMessage(null, `${usernames[socket.id]} left the chat`);
            if (addResult) {
                io.to("menu-chat").emit("infoMessage", { message: `${usernames[socket.id]} left the chat`, type: "menu-chat" });
            }
        }
        catch (err) {
            console.error("Error sending chat message : ", err);
        };
        usernames = usernames.filter((user) => user === usernames[socket.id]);
    });


    // join to game chat
    socket.on("game-chat", (username) => {
        socket.join("game-chat");
        usernames[socket.id] = username;
        io.to("game-chat").emit("infoMessage", { message: `${usernames[socket.id]} joined the chat`, type: "game-chat" });
    });
    // send messages to game chat
    socket.on("sendMessageGame", (message) => {
        io.to("game-chat").emit("receiveMessage", { username: usernames[socket.id], message: message, type: "game-chat" });
    });
    // disconnect from game chat
    socket.on("disconnect", () => {
        io.to("game-chat").emit("infoMessageGame", { message: `${usernames[socket.id]} left the chat`, type: "game-chat" });
        usernames = usernames.filter((user) => user === usernames[socket.id]);
    });

});
