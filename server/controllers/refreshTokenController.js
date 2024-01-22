const jwt = require("jsonwebtoken");
require(`dotenv`).config();
const User = require("../modules/user");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  const { refreshToken } = cookies;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // Handle token verification error
        return res.sendStatus(401);
      }

      try {
        // Find the user in the database based on the decoded user ID
        const user = await User.findById(decoded.userId);

        if (!user) {
          return res.sendStatus(403); // forbidden
        }

        // console.log("Refresh Token from Cookie:", refreshToken);
        // console.log("Refresh Token from User:", user.refreshToken);

        // Check if the refresh token in the cookie matches the one saved with the user
        if (refreshToken !== user.refreshToken) {
          return res.sendStatus(401); // Unauthorized
        }

        // Now you can use the 'user' object as the current authenticated user

        const roles = Object.values(user.roles);

        const accessToken = jwt.sign(
          {
            userId: decoded.userId,
            email: decoded.email,
            name: decoded.name,
            roles: roles,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "20s" }
        );

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          // maxAge: 1000 * 60 * 60,
          maxAge: 1000 * 20,
        }); // Add sameSite attribute
        res.json({
          user: { name: user.name, email: user.email, userId: user._id },
          accessToken,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    }
  );
};

module.exports = handleRefreshToken;
