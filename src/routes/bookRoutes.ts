import express from "express";
import {
  addBook,
  deleteBook,
  getBookbyId,
  getBooks,
  searchBooks,
  updateBook,
} from "../controllers/bookController";
import { verifyToken } from "../middleware";
const router = express.Router();

// Without VerifyToken
router.get("/", getBooks);
router.get("/:id", getBookbyId);
router.get("/search", searchBooks);

// Token Required or Admin
router.post("/", verifyToken, addBook);
router.delete("/:id", verifyToken, deleteBook);
router.put("/:id", verifyToken, updateBook);

module.exports = router;
