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
    //console.log("User connected", socket.id); //#comment

    // join to global game chat
    socket.on("main-menu-chat", (username) => {
        socket.join("main-menu-chat");
        usernames[socket.id] = username;
        io.to("main-menu-chat").emit("infoMessage", `${usernames[socket.id]} joined the chat`);
        //console.log("User join", usernames[socket.id]); //#comment
    });

    // send messages
    socket.on("sendMessage", (message) => {
        io.to("main-menu-chat").emit("receiveMessage", { username: usernames[socket.id], message: message });
    });

    // disconnect from game chat
    socket.on("disconnect", () => {
        io.to("main-menu-chat").emit("infoMessage", `${usernames[socket.id]} left the chat`);
        delete usernames[socket.id];
        //console.log("User disconnected", socket.id); //#comment
    });
});
