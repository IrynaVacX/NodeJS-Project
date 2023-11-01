import   app          from "./server";
import { connection } from "./db";
import { homeRouter } from "./routes/homeRouter";
import   dotenv       from "dotenv";
import { Server } from "socket.io";

let connect = connection;

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
const usernames = {};

io.on("connection", (socket) => {

    // join to global game chat
    socket.on("menu-chat", (username) => {
        socket.join("menu-chat");
        usernames[socket.id] = username;
        io.to("menu-chat").emit("infoMessage", { message: `${usernames[socket.id]} joined the chat`, type: "menu-chat" });
    });
    // send messages to menu chat
    socket.on("sendMessageMenu", (message) => {
        io.to("menu-chat").emit("receiveMessage", { username: usernames[socket.id], message: message, type: "menu-chat" });
    });
    // disconnect from menu chat
    socket.on("disconnect", () => {
        io.to("menu-chat").emit("infoMessage", { message: `${usernames[socket.id]} left the chat`, type: "menu-chat" });
        delete usernames[socket.id];
    });

    // join to global game chat
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
        delete usernames[socket.id];
    });
    
});
