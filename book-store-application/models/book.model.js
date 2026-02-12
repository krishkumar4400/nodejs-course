const { varchar } = require("drizzle-orm/pg-core");
const { uuid } = require("drizzle-orm/pg-core");
const { text } = require("drizzle-orm/pg-core");
const { foreignKey } = require("drizzle-orm/pg-core");
const { integer } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");
const authorTable = require("./author.model.js");

const booksTable = pgTable("books", {
  bookId: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  description: text(),
  price: integer().notNull(),
  authorId: uuid()
    .references(() => authorTable.authorId).notNull(), // id from a different table
});

module.exports = booksTable;

// uuid: randomly generated very big id and very difficult to conflict in the uuid
// varchar has fixed a length while text can have very long text
