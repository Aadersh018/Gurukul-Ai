import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const createAdmin = async () => {
  const existingAdmin = await User.findOne({
    email: "admin@gurukul.ai",
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  );

  await User.create({
    name: "Super Admin",
    email: "admin@gurukul.ai",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin Created");
};

export default createAdmin;