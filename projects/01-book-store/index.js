require("dotenv/config");
const express = require("express");

const app = express();
const port = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
