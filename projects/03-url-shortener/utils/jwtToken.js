
import jwt from 'jsonwebtoken';


export const createJwt = (id) => {
  try {
    const token = jwt.sign(
      {
        id: id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return token
  } catch (error) {
    console.error(error);
    return resizeBy.status(400).json({
      message: "Internal server error",
      success: false,
    });
  }
};
