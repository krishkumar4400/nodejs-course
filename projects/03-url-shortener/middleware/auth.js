
/**
 * @params {import("express").Request} req
 * @params {import("express").Response} res
 * @params {import("express").NextFunction} next
 * 
 */

import { validateUserToken } from "../utils/jwtToken.js";

export async function authenticationMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "You are not logged in 1",
        success: false,
      });
    }

    if (!authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        message: "Incorrect token",
        success: false,
      });
    }

    const [_, token] = authHeader.split(' '); // [Bearer, <TOKEN>]

    const decoded = await validateUserToken(token);
    req.user = decoded.payloadValidatedData.id;
    // console.log(decoded.payloadValidatedData.id);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

/**
 * @params {import("express").Request} req
 * @params {import("express").Response} res
 * @params {import("express").NextFunction} next
 * 
 */

export async function ensureAuthenticated(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "You must be logged in to access this resource",
      success: false,
    });
  }
  next();
}
