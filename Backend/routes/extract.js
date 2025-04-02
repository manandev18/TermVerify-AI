const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const router = express.Router();
const cors = require("cors");

router.use(cors());

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the /extract route
router.post("/api/extract", upload.single("document"), (req, res) => {
  console.log("Received file:", req.file); // Debugging log

  // Ensure file is received
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  console.log("Stored file at:", filePath);

  const scriptPath = path.join(__dirname, "../Scraping/excel_extract.py"); // Adjusted path resolution
  console.log("Executing Python script:", scriptPath);

  const pythonProcess = spawn("python", [scriptPath, filePath]);

  let outputData = "";
  let errorData = "";
  let responseSent = false;

  // Timeout safeguard (30 seconds)
  const timeout = setTimeout(() => {
    if (!responseSent) {
      console.error("Python script timed out.");
      res.status(500).json({ error: "Python script timed out." });
      responseSent = true;
    }
  }, 30000);

  // Capture Python stdout
  pythonProcess.stdout.on("data", (data) => {
    console.log("Python stdout:", data.toString());
    outputData += data.toString();
  });

  // Capture Python stderr
  pythonProcess.stderr.on("data", (data) => {
    console.error("Python stderr:", data.toString());
    errorData += data.toString();
  });

  // Handle script completion
  pythonProcess.on("close", (code) => {
    clearTimeout(timeout); // Clear timeout when process exits
    console.log(`Python process exited with code ${code}`);

    if (!responseSent) {
      if (code === 0 && outputData) {
        try {
          const result = JSON.parse(outputData.trim()); // Ensure valid JSON
          res.json(result);
        } catch (error) {
          console.error("Error parsing Python output:", error);
          res.status(500).json({
            error: "Error processing Python output",
            details: outputData,
            parseError: error.message,
          });
        }
      } else {
        res.status(500).json({
          error: "Python script execution failed",
          code: code,
          stderr: errorData,
          stdout: outputData,
        });
      }
      responseSent = true;
    }
  });

  // Handle process errors
  pythonProcess.on("error", (err) => {
    clearTimeout(timeout);
    console.error("Error spawning Python process:", err);
    if (!responseSent) {
      res
        .status(500)
        .json({ error: "Error spawning Python process", details: err.message });
      responseSent = true;
    }
  });
});

module.exports = router;
