import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validations/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const createJwt = async (payload) => {
  try {
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
    const payloadValidatedData = validationResult.data;
    const token = jwt.sign(
      {
        payloadValidatedData
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return token;
  } catch (error) {
    console.error(error);
    return resizeBy.status(400).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const validateUserToken = async (token) => {
  try {
    const tokenDecode = jwt.verify(token, JWT_SECRET);

    return tokenDecode;
  } catch (error) {
    console.error(error);
    return null
  }
}