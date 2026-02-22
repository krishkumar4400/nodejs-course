import { pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firstname: varchar("first_name", { length: 55 }).notNull(),
  lastname: varchar("last_name", { length: 55 }).notNull(),

  email: varchar({ length: 255 }).notNull().unique(),

  password: text().notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const urlsTable = pgTable("urls", {
  originalUrl: text().notNull(),
  shortUrl: text().notNull(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
});
