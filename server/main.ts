import app from "./server";
import { connection } from "./db";
import dotenv from "dotenv"
import { homeRouter } from "./routes/homeRouter";

let connect = connection;

dotenv.config();

app.use('/', homeRouter);
app.use((req, res) => {
    res.render('main');
});

app.listen(Number(process.env.PORT), () => {
    console.log("Server ready at: ", `http://localhost:${process.env.PORT}/`);
});
