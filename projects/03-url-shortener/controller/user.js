import { usersTable } from "../model/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/index.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const [existingUser] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser) {
      return res.status(400).json({
        message: `User with email id ${email} is already exists`,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: usersTable.id });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET, {
        expiresIn: '7d'
      }
    );

    return res.status(201).json({
      message: "You are registered successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function login(req, res) {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: "Missing details",
            success: false 
        });
    }

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if(!user) {
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false 
        });

    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch); // true || false

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    return res.status(200).json({
        message: "You are logged in",
        success: true,
        token 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
