import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import { appendFile } from "fs";

dotenv.config();
function createDbLog(data) {
    appendFile("DBlog.txt", `${new Date().toLocaleString("en-US")} :: ${data}\n`, () => { });
}
const sequelize = new Sequelize(process.env.PS_DATABASE as string, process.env.PS_USER as string, process.env.PS_PASSWORD, {
    host: process.env.PS_HOST,
    dialect: 'mysql',
    logging: createDbLog,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
try {
    console.log("Database connection success");
    await sequelize.authenticate();
} catch (err) {
    console.log("Database connection error: ", err);
}
export { sequelize }