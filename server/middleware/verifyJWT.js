const jwt = require("jsonwebtoken");
require(`dotenv`).config();

const getProfile = (req, res) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return res.json({
      error: "No token found",
    });
  }

  if (accessToken) {
    // Access token is present, verify and return the profile
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      (err, decoded) => {
        if (err) {
          console.error("Access token verification error:", err);
          res.status(403).json({
            error: "Access token verification error (forbidden)",
          });
        } else {
          res.json({
            name: decoded.name,
            email: decoded.email,
            userId: decoded.userId,
            roles: decoded.roles,
          });
          req.user = decoded.userId; // If you want to store userId in req.user
        }
      }
    );
  }
};

module.exports = {
  getProfile,
};
