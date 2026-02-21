const { pgTable, uuid, varchar, text } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.js");

const booksTable = pgTable("books", {
  bookId: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  authorId: uuid()
    .references(() => authorsTable.authorId)
    .notNull(),
});

module.exports = booksTable;
