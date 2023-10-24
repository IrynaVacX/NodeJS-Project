import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config();

const connection = mysql2.createConnection(process.env.DATABASE_URL as string).promise();

export { connection };
