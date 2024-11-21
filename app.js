const express = require("express");
const sqlite = require("sqlite3");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// connect to database
let db;
try {
  db = new sqlite.Database("dua_main.sqlite", (err) => {
    if (err) {
      console.log("Error connecting to the SQLite database:", err.message);
    } else {
      console.log("Connected to the SQLite database");
    }
  });
} catch (err) {
  console.log(err);
}

// create api endpoints
app.get("/api/categories", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(5000, () => console.log("Server is running on port 5000"));
