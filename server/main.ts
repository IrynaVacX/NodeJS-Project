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
    socket.on("menu-chat", async (username) => {
        socket.join("menu-chat");

        await connect.query("SELECT name, message FROM GlobalChat")
        .then(([rows]) => {
            console.log(rows);
            io.to("menu-chat").emit("global-chat-history", rows);
        })
        .catch((err) => {
            console.error("Error fetching chat history : ", err);
        });
        
        usernames[socket.id] = username;
        await connect.query(`INSERT INTO GlobalChat(name, message) VALUES(?, ?)`, [ null, `${usernames[socket.id]} joined the chat` ])
        .then(() => {
            console.error("Successfully sending chat message");
            io.to("menu-chat").emit("infoMessage", { message: `${usernames[socket.id]} joined the chat`, type: "menu-chat" });
        })
        .catch((err) => {
            console.error("Error sending chat message : ", err);
        });
    });
 

    // send messages to menu chat
    socket.on("sendMessageMenu", async (message) => {
        // connect.query(`DELETE FROM GlobalChat
        //     WHERE id IN (
        //         SELECT id
        //         FROM GlobalChat
        //         ORDER BY id ASC
        //         LIMIT 1)`
        //     );
        await connect.query(`INSERT INTO GlobalChat(name, message) VALUES(?, ?)`, [ usernames[socket.id], message ])
        .then(() => {
            console.error("Successfully sending chat message");
            io.to("menu-chat").emit("receiveMessage", { username: usernames[socket.id], message: message, type: "menu-chat" });
        })
        .catch((err) => {
            console.error("Error sending chat message : ", err);
        });
    });
    // disconnect from menu chat
    socket.on("disconnect", async () => {
        await connect.query(`INSERT INTO GlobalChat(name, message) VALUES(?, ?)`, [ null, `${usernames[socket.id]} left the chat` ])
        .then(() => {
            console.error("Successfully sending chat message");
            io.to("menu-chat").emit("infoMessage", { message: `${usernames[socket.id]} left the chat`, type: "menu-chat" });
        })
        .catch((err) => {
            console.error("Error sending chat message : ", err);
        });
        delete usernames[socket.id];
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
        delete usernames[socket.id];
    });
    
});
