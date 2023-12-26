const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  signupUser,
  loginUser,
  // getProfile,
} = require("../controllers/authController");
const { getProfile } = require("../middleware/verifyJWT");
const handleRefreshToken = require("../controllers/refreshTokenController");
const handleLogout = require("../controllers/logoutController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");
const {
  getAllTeachers,
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacher,
} = require("../controllers/teacherController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000", // Replace with the actual origin of your React app
  })
);
router.get("/", test);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);
router.get("/profile", getProfile);
router
  .route("/teachers")
  .get(getAllTeachers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), createNewTeacher)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), updateTeacher)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteTeacher);

router.route("/teachers/:id").get(getTeacher);

module.exports = router;
