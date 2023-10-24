import { app } from "./server";
import { connection } from "./db";
const PORT = 4000;

const getTimestamp=()=>{
    return connection.query('SELECT CURRENT_TIMESTAMP');
}
console.log(await getTimestamp());

app.get('/', (req, res) => {
    res.render('main', {
        layout: "index",
    })
})
app.get('*', (req, res) => {
    res.render('main');
})
app.listen(PORT, () => {
    console.log("Server ready at: ", `http://localhost:${PORT}/`);
})