const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");



exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((err) => {
      formattedErrors[err.path] = err.msg;
    });
    return errorResponse(res, "Validation error", formattedErrors, 400);
  }

  try {
    const { name, email, password, status, role } = req.body;

    if (!name) {
      const error = new Error("Name required");
      error.status = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    userModel.createUser(
      [name, email, hashedPassword, status, role],
      (err, result) => {
        if (err) return next(err);
        return successResponse(
          res,
          { id: result.insertId },
          "User registered",
          201,
        );
      },
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.allUsers = (req, res) => {
  userModel.allUsers((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, status } = req.body;

  userModel.updateUser([name, email, status, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated" });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  userModel.deleteUser([id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role   // 👈 important
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
  });
};
