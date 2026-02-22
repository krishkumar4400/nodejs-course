import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.js";
import db from "./db/index.js";
import usersTable, { userSessions } from "./model/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const port = process.env.PORT ?? 8001;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello Express",
  });
});

// middlewares
app.use(express.json());
app.use(async function (req, res, next) {
  const sessionId = req.headers["session-id"];
  if (!sessionId) {
    return next();
  }
  const [data] = await db
    .select({
      sessionId: userSessions.id,
      userId: usersTable.id,
      user: userSessions.userId,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSessions)
    .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
    .where((table) => eq(table.sessionId, sessionId));

  if (!data) {
    return next();
  }

  req.user = data;
  next();
});

app.use("/api/auth", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
