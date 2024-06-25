import express from "express";
import { borrowBook, returnBook } from "../controllers/transcationController";
import { verifyToken } from "../middleware";
const router = express.Router();

router.post("/books/borrow", verifyToken, borrowBook);
router.post("/books/return", verifyToken, returnBook);

module.exports = router;
