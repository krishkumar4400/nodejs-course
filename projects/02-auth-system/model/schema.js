import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export default usersTable;
