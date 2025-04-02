const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auths");
const extroute = require("./routes/extract");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/", extroute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
