const User = require("../modules/user");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.refreshToken) {
    // No refreshToken cookie, consider the user as logged out
    return res.sendStatus(204);
  }

  const { refreshToken } = cookies;

  try {
    // Find the user in the database based on the refreshToken
    const user = await User.findOne({ refreshToken });

    if (!user) {
      // User not found, clear refreshToken cookie and consider the user as logged out
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 0,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken
    const currentUser = { ...user.toObject(), refreshToken: "" };
    await User.updateOne({ _id: user._id }, currentUser);

    // Clear refreshToken cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 0,
    });

    // Consider the user as logged out
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = handleLogout;
