import express from "express";
import { Login, Register } from "../controllers/authController";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
