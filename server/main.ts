import { app } from "./server";
import { connection } from "./db";
const PORT = 4000;


app.get('/', (req, res) => {
    res.render('main', {
        layout: "index",
    })
})
let connect=connection;
app.get('/registration', (req, res) => {
    res.render('reg', {
        layout: "index",
    })
})

app.get('*', (req, res) => {
    res.render('main');
})

app.listen(PORT, () => {
    console.log("Server ready at: ", `http://localhost:${PORT}/`);
})