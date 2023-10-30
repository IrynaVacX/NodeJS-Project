import app from "./server";
import { connection } from "./db";
import dotenv from "dotenv";
import { homeRouter } from "./routes/homeRouter";

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

io.on("connection", (socket) => {
    // join to global game chat
    socket.join("main-menu-room");
    console.log("Connected");

    socket.on("chat message", (msg) => {
        io.to("main-menu-room").emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        io.to("main-menu-room").emit("chat message", "Disconnected");
        console.log("Disconnected");
    });
});
