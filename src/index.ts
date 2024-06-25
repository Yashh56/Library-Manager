import express from "express";
import dotenv from "dotenv";
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const transcationRoutes = require("./routes/transcationRoutes");
const usersRoutes = require("./routes/userRoutes");
const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/users", usersRoutes);
app.use("/", transcationRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
