import {
  jsonErrorHandler,
  jsonSuccessHandler,
} from "../helpers/jsonHandler.js";
import { hashPassword } from "../helpers/passwordHashing.js";
import { isValidEmail, isValidPassword } from "../helpers/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json(jsonErrorHandler["error6"]);
    }
    const isEmailValid = isValidEmail(email);
    if (!isEmailValid) {
      return res.status(422).json(jsonErrorHandler["error1"]);
    }
    const user = await User.findOne({ email: email, adminRole: false});
    if (!user) {
      return res.status(404).json(jsonErrorHandler["error4"]);
    }
    const passwordChecking = await bcrypt.compare(password, user.password);
    if (!passwordChecking) {
      return res.status(422).json(jsonErrorHandler["error2"]);
    }
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: "user",
      },
      process.env.usertoken_secretKey,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("userAccessToken", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json(jsonSuccessHandler["success2"]);
  } catch (error) {
    return res.status(500).json(jsonErrorHandler["error0"]);
  }
};

export const userRegister = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json(jsonErrorHandler["error6"]);
    }
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    if (!isEmailValid) {
        return res.status(422).json(jsonErrorHandler["error1"]);
    }
    if (!isPasswordValid) {
        return res.status(422).json(jsonErrorHandler["error2"]);
    }
    if (password !== confirmPassword) {
        return res.status(422).json(jsonErrorHandler["error3"]);
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json(jsonErrorHandler["error5"]);
    }
    const hashedPassword = await hashPassword(password);
    const data = { fullName, password: hashedPassword, email };
    const result = new User(data);
    const response = await result.save();
    res.status(201).json(jsonSuccessHandler["success1"]);
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("userAccessToken");
    res.status(200).json(jsonSuccessHandler["success3"]);
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json(jsonErrorHandler["error6"]);
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json(jsonErrorHandler["error4"]);
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if(password){
        const hashedPassword = await hashPassword(password);
        user.password=hashedPassword;
    }
    await user.save();
    res.status(200).json(jsonSuccessHandler['success4']);
  } catch (error) {
    res.status(500).json(jsonErrorHandler["error0"]);
  }
};


