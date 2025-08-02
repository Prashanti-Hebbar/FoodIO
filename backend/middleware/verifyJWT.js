import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
  const token = req.cookies.token 
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
}
export { verifyJWT };