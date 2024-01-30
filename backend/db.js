import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "091199",
    database: "multifiltros",
    port: 3306,
});