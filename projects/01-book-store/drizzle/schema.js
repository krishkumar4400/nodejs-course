const { varchar } = require("drizzle-orm/pg-core");
const { integer } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");

const usersTable = pgTable('users', {
    id: integer().primaryKey(),
    name: varchar({length: 100}).notNull(),
    email: varchar({length: 255}).notNull().unique()
});

module.exports = {
    usersTable
};