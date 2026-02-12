const {} = require("drizzle-orm/node-postgres");
const { text } = require("drizzle-orm/pg-core");
const { uuid } = require("drizzle-orm/pg-core");
const { varchar } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");

const authorTable = pgTable("authors", {
  authorId: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  profileImageUrl: text(),
});

module.exports = authorTable;
