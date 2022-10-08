const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./sqlite-pass-4/db.sqlite3");

db.serialize(() => {
  console.log("ready");
});

export default function handler(req, res) {
  const { query } = req.body;
  db.all(
    `SELECT * FROM transactions_search where username_address match ?;`,
    query,
    (err, transactions) => {
      console.log("err", err);
      console.log("transactions", transactions);
      res.status(200).json({ success: true, transactions });
    }
  );
}
