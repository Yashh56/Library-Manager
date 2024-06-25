import { db } from "../lib/db";

const getBooks = async (req, res) => {
  try {
    const getAllBooks = await db.book.findMany();
    return res.status(200).json(getAllBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const getBookbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await db.book.findFirst({
      where: {
        id,
      },
    });
    if (!book) {
      return res.status(400).json({ message: "Book not Found !!" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
};

const addBook = async (req, res) => {
  const { title, description, author, copiesAvailable } = req.body;
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    const existedBook = await db.book.findUnique({
      where: {
        title,
      },
    });
    if (existedBook) {
      return res.status(400).json({ message: "Book Already Exists" });
    }

    const book = await db.book.create({
      data: {
        author,
        title,
        description,
        copiesAvailable,
      },
    });
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    const deleteAnBook = await db.book.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Book has been deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, copiesAvailable } = req.body;
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    const existedBook = await db.book.findUnique({
      where: {
        id,
      },
    });

    if (!existedBook) {
      return res
        .status(404)
        .json({ message: "Book does not exists in the system" });
    }

    const updateAnBook = await db.book.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        author,
        copiesAvailable,
      },
    });

    return res.status(200).json({ message: "Data has been updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const searchBooks = async (req, res) => {
  const { title, author } = req.query;

  try {
    let searchCriteria: any = {};

    if (title) {
      searchCriteria.title = { contains: title, mode: "insensitive" };
    }

    if (author) {
      searchCriteria.author = { contains: author, mode: "insensitive" };
    }

    const books = await db.book.findMany({
      where: searchCriteria,
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};

export { getBooks, getBookbyId, addBook, updateBook, deleteBook, searchBooks };
