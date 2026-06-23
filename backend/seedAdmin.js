import dotenv from "dotenv";
import connectDB from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await createAdmin();

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seed();