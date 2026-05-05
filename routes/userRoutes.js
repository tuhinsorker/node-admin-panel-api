const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
router.get("/users", userController.allUsers);
router.post("/users", userController.register);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

const { body } = require("express-validator");

router.post(
  "/register",
    body('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid email'),
    body('password')
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Minimum 8 characters'),
    userController.register,
);

router.post("/login", userController.login);
router.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
