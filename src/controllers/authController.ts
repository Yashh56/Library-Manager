import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../lib/db";

const Register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: { username },
    });
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

export { Login, Register };
