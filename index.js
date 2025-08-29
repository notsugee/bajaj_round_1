const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const fullName = "sujith_p";  
const dob = "19072004";
const email = "p.sujith303@gmail.com";
const rollNumber = "22BPS1193";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let letters = [];

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) evenNumbers.push(item);
        else oddNumbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        letters.push(item);
      } else {
        specialChars.push(item);
      }
    });

    let concatString = letters.join("").split("").reverse().map((ch, idx) =>
      idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");

    res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("server running on port 3000"));
