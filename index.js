const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(cors());

let connection;

// ใช้ IIFE (Immediately Invoked Function Expression) เพื่อเชื่อมต่อฐานข้อมูล
(async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("📌 Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

app.get("/hello", function (req, res) {
  res.json({ msg: "hello" });
});

app.get("/office", async (req, res) => {
  // ต้องใช้ async function
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `tbl_test`"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Database query failed");
  }
});

app.listen(5000, function () {
  console.log("✅ CORS-enabled web server listening on port 5000");
});
