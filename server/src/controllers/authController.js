import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js"


export const register = async (request, reply) => {
  try {
    const {
      username,
      email,
      password,
      role,
    } = request.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return reply.status(400).send({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    reply.send({
      token,
      user,
    });
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const login = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return reply.status(400).send({
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return reply.status(400).send({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    reply.send({
      token,
      user,
    });
  } catch (error) {
    reply.status(500).send(error);
  }
};