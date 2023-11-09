import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config();

const planetScaleConnection = new Sequelize(process.env.PS_DATABASE as string, process.env.PS_USER as string, process.env.PS_PASSWORD, {
    host: process.env.PS_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
try {
    console.log("Database connection success");
    await planetScaleConnection.authenticate();
} catch (err) {
    console.log("Database connection error: ", err);
}
export { planetScaleConnection }