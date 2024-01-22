const User = require("../modules/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
require(`dotenv`).config();

let globalToken; // Variable to store the token globally

const test = (req, res) => {
  res.json("test is working");
};

// signup endpoint

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if name was entered
    if (!name) {
      return res.json({
        error: "Please enter your name",
      });
    }
    //  check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must at least 6 characters long",
      });
    }
    // check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email has been used",
      });
    }

    const hashedPassword = await hashPassword(password);
    // create user in db
    const user = await User.create({
      name,
      email,
      roles: { User: 2093 },
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//  login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        error: "No user found",
      });
      res.sendStatus(401); // unauthorized
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      const roles = Object.values(user.roles).filter(Boolean);

      const refreshToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          name: user.name,
        },
        process.env.REFRESH_TOKEN_SECRET, // Use the refresh token secret
        { expiresIn: "7d" }
      );

      const accessToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          name: user.name,
          roles: roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20s" } // change back to 1h
      );

      // const foundUser = await User.findOne({ name: user });
      // const otherUsers = await User.find({
      //   name: { $ne: foundUser.name },
      // });

      const currentUser = { ...user.toObject(), refreshToken };
      // // Update the authenticated user
      await User.updateOne({ _id: user._id }, currentUser);

      // // Fetch the updated user after the update
      // const updatedUser = await User.findById(foundUser._id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 60 * 60 * 24 * 7 * 1000,
      }); // Add sameSite attribute
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        // maxAge: 1000 * 60 * 60,
        maxAge: 1000 * 20,
      }); // Add sameSite attribute
      res.json({
        user: {
          name: user.name,
          email: user.email,
          userId: user._id,
          roles: roles,
        },
        accessToken,
      });
    } else {
      return res.json({
        error: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
    res.status(401);
  }
};

module.exports = {
  test,
  signupUser,
  loginUser,
  // getProfile,
};
