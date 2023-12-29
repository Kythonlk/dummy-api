const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, mobile NUMERIC, email2 TEXT, mobile2 NUMERIC)');
});

app.get('/api/users/all', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, mobile , email2, mobile2 } = req.body;
  db.run('INSERT INTO users (name, email, mobile, email2 , mobile2 ) VALUES (?, ?, ?, ?, ?)', [name, email, mobile, email2, mobile2], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ message: 'User deleted', deletedId: id });
    });
});

app.listen(port, () => {
  console.log(`Dummy CRM API running at http://localhost:${port}`);
});
