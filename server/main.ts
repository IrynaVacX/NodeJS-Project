import { app } from "./server";
import { connection } from "./db";
import { Server } from "socket.io";

const PORT = 4000;
let connect = connection;

//////// NAVIGATION ////////
app.get('/', (req, res) => {
    res.render('main', {
        layout: "index",
    });
});

app.get('/menu', (req, res) => {
    res.render('menu', {
        layout: "index",
    })
});


app.get('/registration', (req, res) => {
    res.render('reg', {
        layout: "index",
    })
});

app.get('*', (req, res) => {
    res.render('main');
});


//////// SERVER RUN ////////
const server = app.listen(PORT, () => {
    console.log("Server ready at: ", `http://localhost:${PORT}/`);
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
