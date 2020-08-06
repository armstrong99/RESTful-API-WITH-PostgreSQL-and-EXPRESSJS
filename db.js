const { Pool } = require("pg");

// const Pooler = require("pg").Pool;

const pool = new Pool({

    user: "YOUR USERNAME",
    password: "YOUR PASSWORD",
    host: "localhost",
    port: "YOUR PORT NUMBER",
    database: "YOUR DATABASE_NAME"

});

module.exports = pool;

