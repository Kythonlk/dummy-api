const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3030;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE crm (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      AcName TEXT,
      AcSalutation TEXT,
      AcType TEXT,
      AcCode TEXT,
      AcContact TEXT,
      AcMobile TEXT,
      AcMobile2 TEXT,
      AcEmail TEXT,
      AcEmail2 TEXT
    )
  `);
});

app.get("/crm", (req, res) => {
  db.all("SELECT * FROM crm", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/crm", (req, res) => {
  const {
    AcName,
    AcSalutation,
    AcType,
    AcCode,
    AcContact,
    AcMobile,
    AcMobile2,
    AcEmail,
    AcEmail2,
  } = req.body;

  db.run(
    "INSERT INTO crm (AcName, AcSalutation, AcType, AcCode, AcContact, AcMobile, AcMobile2, AcEmail, AcEmail2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      AcName,
      AcSalutation,
      AcType,
      AcCode,
      AcContact,
      AcMobile,
      AcMobile2,
      AcEmail,
      AcEmail2,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    },
  );
});

app.post("/any", (req, res) => {
  console.log("Received POST request with data:");
  console.log(req.body);
  res.send("Data received successfully!");
});

app.listen(port, () => {
  console.log(`Dummy CRM API running at http://localhost:${port}`);
});
