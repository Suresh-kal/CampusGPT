const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUserService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hashedPassword,
  });

  const safeUser = await User.findById(user._id);

  return safeUser;
};

module.exports = {
  registerUserService,
};