import express from "express"
import { engine } from "express-handlebars"
import { resolve } from "path";
const app = express();

app.use(express.static("public"))

app.set("view engine", "hbs");

app.engine("hbs", engine({
    layoutsDir: resolve() + "/views/layouts",
    extname: "hbs",
    defaultLayout: "notFound"
}));

export { app };