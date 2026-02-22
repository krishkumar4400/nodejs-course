import { eq } from "drizzle-orm";
import db from "../db/index.js";
import usersTable from "../model/schema.js";
import { createHmac, randomBytes } from "node:crypto";

export const getAllUser = async (req, res) => {
  try {
    const user = await db
      .select({
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable);
    console.log(user);
    return res.status(200).json({
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const [existingUser] = await db
      .select({
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already taken",
        sucsess: false,
      });
    }

    const salt = randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    console.log(name);
    console.log(email);
    console.log(hashedPassword);
    console.log(salt);

    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    console.log(user);

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: {
        userId: user.id,
      },
    });
  } catch (error) {
    console.error(error);
    console.error(JSON.stringify(error, null, 2));
    return res.status(500).json({
      message: "Internal server error",
      sucsess: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [existingUser] = await db
      .select({
        email: usersTable.email,
        salt: usersTable.salt,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({
        message: `User with email ${email} does not exists`,
        success: false,
      });
    }

    const hash = createHmac("sha256", existingUser.salt)
      .update(password)
      .digest("hex");

    if (hash !== existingUser.password) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Generate a session for user.

    return res.status(200).json({
      message: "You are logged in",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: true,
    });
  }
};
