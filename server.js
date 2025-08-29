const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// User details (replace with your own details 👇)
const FULL_NAME = "ankush aggarwal"; // must be lowercase
const DOB = "10022003"; // ddmmyyyy
const EMAIL = "ankush.aggarwal2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE3511";

// Utility function to alternate caps in reverse order
function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse();
  return reversed
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

// POST /bfhl
app.get("/", (req, res) => {
  res.json({ status: "API is running ✅" });
});
app.post("/bfhl", (req, res) => {
  try {
    const inputData = req.body.data;

    if (!Array.isArray(inputData)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, 'data' must be an array",
      });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphaString = "";

    inputData.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // It's a number (integer)
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item); // keep as string
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // It's alphabetic
        alphabets.push(item.toUpperCase());
        alphaString += item;
      } else {
        // Special character
        special_characters.push(item);
      }
    });

    const concat_string = alternatingCapsReverse(alphaString);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

