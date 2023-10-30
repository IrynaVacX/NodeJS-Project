import app from "./server";
import { connection } from "./db";
<<<<<<< HEAD
import dotenv from "dotenv"
import { homeRouter } from "./routes/homeRouter";
=======
import { Server } from "socket.io";

const PORT = 4000;
let connect = connection;

//////// NAVIGATION ////////
const getTimestamp = () => {
    return connection.query('SELECT CURRENT_TIMESTAMP');
};
console.log(await getTimestamp());
>>>>>>> 563cf49cf1089e6b00415773a5e390aeda32c6d2

let connect = connection;

dotenv.config();

<<<<<<< HEAD
app.use('/', homeRouter);
app.use((req, res) => {
    res.render('main');
});

app.listen(Number(process.env.PORT), () => {
    console.log("Server ready at: ", `http://localhost:${process.env.PORT}/`);
=======
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

app.get('/loader', (req, res) => {
    res.render('loader', {
        layout: "index",
    });
});

app.get('/menu', (req, res) => {
    res.render('menu', {
        layout: "index",
    })
});

app.get('*', (req, res) => {
    res.render('main');
});

//////// SERVER RUN ////////
const server = app.listen(PORT, () => {
    console.log("Server ready at: ", `http://localhost:${PORT}/`);
>>>>>>> 563cf49cf1089e6b00415773a5e390aeda32c6d2
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
