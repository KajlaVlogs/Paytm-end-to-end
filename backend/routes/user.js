const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/middleware");

const zodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const signInZodSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const parsedSchema = zodSchema.safeParse(req.body);
  if (!parsedSchema.success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: Math.random() * 10000 + 1,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const parsedSchema = signInZodSchema.safeParse(req.body);
  if (!parsedSchema.success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });


  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
    const urll = `http://localhost:5173/sendmoney?id=${existingUser._id}&firstName=${existingUser.firstName}&lastName=${existingUser.lastName}`;
    
    return res.status(200).json({
      token,
      urll,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const parsedSchema = updateBody.safeParse(req.body);
  if (!parsedSchema.success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ id: req.userId }, { $set: req.body });
  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const name = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: name,
        },
      },
      {
        lastName: {
          $regex: name,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = {
  userRouter,
};
