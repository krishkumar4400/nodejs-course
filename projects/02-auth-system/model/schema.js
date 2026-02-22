import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";



const usersTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({length:100}).notNull(),
    email: varchar({length: 255}).unique().notNull(),
    password: varchar({length: 6}).notNull()
});

export default usersTable;