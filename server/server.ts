import express from "express"
import  session  from "express-session"
import { engine } from "express-handlebars"
import { resolve } from "path";
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.static("public"));
app.use(express.json())
app.use(express.text())

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 24 * 3600000
    }
}))

app.set("view engine", "hbs");
app.engine("hbs", engine({
    layoutsDir: resolve() + "/views/layouts",
    extname: "hbs",
    defaultLayout: "notFound"
}));

export default app;