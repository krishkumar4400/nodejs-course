const { defineConfig } = require("drizzle-kit");

// const config = defineConfig({
//   out: "./drizzle",
//   schema: "./drizzle/schema.js",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: "postgresql://postgres:admin@127.0.0.1:5432/mydb",
//   },
// });

// module.exports = config;

module.exports = defineConfig({
  schema: "./drizzle/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:Krish@9661@127.0.0.1:5432/mydb",
  },
});

// i will say hey drizzle can you do me a favor can you read my schema file ("./drizzle/schema.js"), and tell this postgress that is running on this url(postgres://postgres:admin@localhost:5432/mydb) that hey this is the schema that i have to follow 
// - run the command: npx drizzle-kit push - it will this configuration file that drizzle.config.js it will say oh this is the schema("./drizzle/schema.js") that i have to read, so go here read this schema and give this particular schema to the postgress database


// npx drizzle-kit studio

// npm drizzle-kit push: read the schema and pushed to particular database that is running here(docker compose).

// drizzle kit work is sync this schema and give this ui