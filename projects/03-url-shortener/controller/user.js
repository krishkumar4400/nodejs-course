import bcrypt from "bcrypt";
import {
  loginPostRequestBodySchema,
  signUpPostRequestBodySchema,
} from "../validations/request.validation.js";
import { z } from "zod";
import { hashPassword } from "../utils/hash.js";
import { createJwt } from "../utils/jwtToken.js";
import { createUser, getUserByEmail } from "../services/user.service.js";

export async function register(req, res) {
  try {
    const validationResult = await signUpPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res.status(400).json({
        message: treeifyError(validationResult.error),
        success: false,
      });
    }

    const { firstname, lastname, email } = validationResult.data;
    let { password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: `User with email id ${email} is already exists`,
        success: false,
      });
    }

    password = await hashPassword(password);

    const user = await createUser(firstname, lastname, email, password);

    const token = await createJwt(user.id);

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
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res.status(400).json({
        message: z.treeifyError(validationResult.error),
        success: false,
      });
    }

    const { email, password } = validationResult.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch); // true || false

    const token = await createJwt({id: user.id});

    return res.status(200).json({
      message: "You are logged in",
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
