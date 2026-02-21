const { pgTable, uuid, varchar, text } = require("drizzle-orm/pg-core");

const authorsTable = pgTable("authors", {
  authorId: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar({ length: 100 }).notNull(),
  lastName: varchar({ length: 100 }),
  email: text().notNull().unique(),
  imageUrl: text(),
});

module.exports = authorsTable;
