import { db } from "../lib/db";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.user.findMany({
      include: {
        transactions: {
          include: {
            book: true,
          },
        },
      },
    });
    return res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        transactions: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist by this username" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

export { getAllUsers, getUserByUsername };
