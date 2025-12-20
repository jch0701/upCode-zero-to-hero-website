import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    // Decode the JWT without verifying
    const decoded = jwt.decode(token);
    if (!decoded?.sub) {
      return res.status(401).json({ message: "Invalid token structure" });
    }
    console.log("AUTH HEADER:", req.headers.authorization);

    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };

    console.log("USER:", req.user);
    next();
  } catch (err) {
    console.error("JWT decode error:", err.message);
    res.status(401).json({ message: "Token decode failed" });
  }
};
