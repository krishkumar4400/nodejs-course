import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { urlsTable } from "../model/schema.js";

export const insertUrl = async (shortCode, url, userId) => {
  const [data] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetUrl: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
      userId: urlsTable.userId,
    });

  return data;
};

export const fetchUrls = async (userId) => {
  const data = await db
    .select()
    .from(urlsTable)
    .where(eq(userId, urlsTable.userId));
  return data;
};

export const deleteUrl = async (urlId, userId) => {
  await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, urlId), eq(urlsTable.userId, userId)));
};

export const redirect = async (shortCode) => {
  const [result] = await db
    .select({
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));
  return result;
};
