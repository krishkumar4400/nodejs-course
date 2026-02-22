import {  pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
});

export const urlsTable = pgTable('urls', {
    originalUrl: text().notNull(),
    shortUrl: text().notNull(),
    userId: uuid().references(() => usersTable.id).notNull()
});