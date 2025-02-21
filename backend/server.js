// server.js
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Your user details (replace with your actual details)
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input format" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);
    const highest_alphabet =
      alphabets.length > 0
        ? [
            alphabets.reduce((a, b) =>
              a.toLowerCase() > b.toLowerCase() ? a : b
            ),
          ]
        : [];

    console.log(numbers, alphabets);
    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
