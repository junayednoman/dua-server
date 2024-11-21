const express = require("express");
const sqlite = require("sqlite3").verbose();
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// connect to database
let db;
try {
  db = new sqlite.Database(path.join(__dirname, "dua_main.sqlite"), (err) => {
    if (err) {
      console.log("Error connecting to the SQLite database:", err.message);
    } else {
      console.log("Connected to the SQLite database");
    }
  });
} catch (err) {
  console.log(err);
}

// create api endpoints id
app.get("/api/categories", (req, res) => {
  db.all(
    "SELECT id, cat_name_en, cat_icon, no_of_dua, no_of_subcat FROM category",
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    }
  );
});

app.get("/api/subcategories", (req, res) => {
  const categoryId = req.query.cat;
  const query =
    "SELECT id, cat_id, subcat_name_en FROM sub_category WHERE cat_id = ?";
  db.all(query, [categoryId], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

app.get("/api/duas", (req, res) => {
  const subCategoryId = req.query.subcat;
  const query =
    "SELECT id, cat_id, subcat_id, dua_name_en, top_en, dua_arabic, transliteration_en, translation_en, bottom_en, refference_en, audio FROM dua WHERE subcat_id = ?";
  db.all(query, [subCategoryId], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(5000, () => console.log("Server is running on port 5000"));
