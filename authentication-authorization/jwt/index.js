import 'dotenv/config';
import express from "express";
import router from './routes/user.routes.js';

const app = express();

const port = process.env.PORT ?? 8001;

app.get("/", (req, res) => {
  res.send("Hello Express");
});

// middlewares
app.use(express.json());
app.use('/api/auth', router);

app.listen(port, () => {
  console.log(`server is up and running on http://localhost:${port}`);
});
