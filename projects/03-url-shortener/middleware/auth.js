import jwt from "jsonwebtoken";

export async function authenticationMiddleware(req, res, next) {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res.status(401).json({
        message: "You are not logged in",
        success: false,
      });
    }

    if (!tokenHeader.startWith("Bearer")) {
      return res.status(400).json({
        message: "Incorrect token",
        success: false,
      });
    }

    const token = tokenHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function ensureAuthenticated(req, res, next) {
  if (!req.user) {
    return req.status(400).json({
      message: "You are not logged in",
      success: false,
    });
  }
  next();
}
