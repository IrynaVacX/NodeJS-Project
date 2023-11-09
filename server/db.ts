import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config();

const connection = mysql2.createConnection(process.env.DATABASE_URL as string).promise();

const isUsersExist = async () => {
    let result = await connection.query(`SELECT count(*) AS table_count FROM information_schema.TABLES
    WHERE (TABLE_NAME='Users') and (TABLE_SCHEMA='gamedb')`);
    return result[0][0].table_count;
}

const configureDB = async () => {
    if (await isUsersExist() !== 1) {
        await connection.query(`CREATE TABLE Users(
            \`id\` BIGINT UNSIGNED PRIMARY KEY DEFAULT(UUID_SHORT()),
            \`name\` VARCHAR(15) NOT NULL,
            \`password\` VARCHAR(15) NOT NULL,
            \`created\` DATETIME NOT NULL DEFAULT(CURRENT_TIMESTAMP)
        )`);
    }
    
    // await connection.query(`DROP TABLE GlobalChat`);
    // if (true) {
    //     await connection.query(`CREATE TABLE GlobalChat(
    //         \`id\` BIGINT AUTO_INCREMENT PRIMARY KEY,
    //         \`name\` VARCHAR(15) NULL,
    //         \`message\` VARCHAR(255) NOT NULL
    //     )`);
    // }

}
await configureDB();
export { connection };
