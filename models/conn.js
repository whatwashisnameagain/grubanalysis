require('dotenv').config();

const pgp = require('pg-promise')({
    query: e => {
        // console.log("QUERY:", e.query);
    }
})


const options = {
    host: "drona.db.elephantsql.com",
    user: "ymofaetq",
    database: "ymofaetq",
    password: "KgRJJTBmhmV6lnOj4NmY-lXbiCsCILLS"
}

// host: process.env['DB_HOST'],
// user: process.env['DB_USER'],
// database: process.env['DB_NAME'],
// password: process.env['DB_PASSWORD']

const db = pgp(options);

module.exports = db;