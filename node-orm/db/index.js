const { drizzle } = require("drizzle-orm/node-postgres");



//  postres://<username>:<password>@<host>:<port>/<db_name>
const db = drizzle("postgres://postgres:admin@localhost:5432/mydb");

module.exports = db;

// this connection is used when we want to send data to the database and receive it.
