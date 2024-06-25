import { db } from "../lib/db";

const borrowBook = async (req, res) => {
  const { bookId, borrowDate, dueDate } = req.body;
  const userId = req.user.userId;

  try {
    const book = await db.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return res
        .status(404)
        .json({ message: "Book does not exist in the database" });
    }

    if (book.copiesAvailable <= 0) {
      return res.status(400).json({ message: "No copies available" });
    }

    const transaction = await db.transaction.create({
      data: {
        userId,
        bookId,
        borrowDate: new Date(borrowDate),
        dueDate: new Date(dueDate),
      },
    });

    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        copiesAvailable: {
          decrement: 1,
        },
      },
    });

    return res.status(201).json({
      message:
        "Book has been borrowed. Please return it on or before the due date.",
      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const returnBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.userId;

  try {
    const transaction = await db.transaction.findFirst({
      where: {
        userId,
        bookId,
        returnDate: null,
      },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "The book is not borrowed by the user!" });
    }

    await db.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        returnDate: new Date(),
      },
    });

    const updatedBook = await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        copiesAvailable: {
          increment: 1,
        },
      },
    });

    return res.status(200).json({
      message: "Book has been returned successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { borrowBook, returnBook };
