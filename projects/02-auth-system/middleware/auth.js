import db from "../db/index.js";
import { eq } from "drizzle-orm";
import usersTable, { userSessions } from "../model/schema.js";

export default async function authMiddleware(req, res, next) {
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
}
