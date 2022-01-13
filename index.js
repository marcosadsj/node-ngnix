const express = require("express");
const mysql = require("mysql");
const random_name = require('node-random-name');

const app = express();

const PORT = 3333;

const config = {
    host: "mysql",
    user: "node-nginx-user",
    password: "node-nginx-password",
    database: "node-nginx-db"
};

const connection = mysql.createConnection(config);

const createTableSQL = "CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id), KEY(id))";
const getAllPeopleSQL = "SELECT * FROM people";

connection.query(createTableSQL);

app.get("/", (req, res) => {

    connection.query(`INSERT INTO people(name) values('${random_name({ random: Math.random })}')`);

    const result = connection.query(getAllPeopleSQL, (error, results, fields) => {

        if (error)
            res.send(`<h1>Full Cycle Rocks!!</h1><div>${error}</div>`);

        const list = results?.map(value => `<li>${value.name}</li>`);

        const resultString = `
            <h1>Full Cycle Rocks!!</h1>
            <ul>
            ${list.toString().replaceAll(",", "")}
            </ul>                
        `;

        res.send(resultString);
    });
});

app.listen(3333, () => {
    console.log("Api listen on port: " + PORT);
});