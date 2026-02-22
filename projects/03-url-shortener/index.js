import express from "express";
import "dotenv/config";
import userRouter from "./routes/user.js";

const app = express();

const port = process.env.PORT ?? 8001;

app.get("/", (req, res) => {
  res.send("Hello Express");
});

// middlewares
app.use(express.json());
app.use("/api/auth", userRouter);

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
