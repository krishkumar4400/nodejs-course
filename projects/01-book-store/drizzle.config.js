import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log("DB URL: ", process.env.DATABASE_URL);

const config = defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports = config;