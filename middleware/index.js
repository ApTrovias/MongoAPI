import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
  } catch (err) {
    res.status(401).json({ error: "Cannot decode" });
  }
};
