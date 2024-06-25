import express from "express";
import { getAllUsers, getUserByUsername } from "../controllers/userController";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:username", getUserByUsername);

module.exports = router;
