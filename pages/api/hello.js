const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./sqlite-pass-4/db.sqlite3");

db.serialize(() => {
  console.log("ready");
});

export default function handler(req, res) {
  const { query } = req.body;
  if (query.length < 3) {
    // TODO: check if output is too large
    // res.json({
    //   success: false,
    //   error: "Query must be at least 3 characters",
    // });
    // return;
  }
  db.all(
    `SELECT 
      highlight(transactions_search, 0, '<b>', '</b>') username_joined,
      highlight(transactions_search, 1, '<b>', '</b>') address,
      highlight(transactions_search, 2, '<b>', '</b>') date,
      highlight(transactions_search, 3, '<b>', '</b>') account,
      highlight(transactions_search, 4, '<b>', '</b>') type,
      highlight(transactions_search, 5, '<b>', '</b>') descriptive_purpose,
      highlight(transactions_search, 6, '<b>', '</b>') coin,
      highlight(transactions_search, 7, '<b>', '</b>') coin_quantity,
      highlight(transactions_search, 8, '<b>', '</b>') coin_usd
    FROM transactions_search 
    where transactions_search 
    MATCH ?;`,
    query,
    (err, transactions) => {
      if (err) {
        res.json({
          success: false,
          error: err.message,
        });
        return;
      }
      console.log("err", err);
      console.log("transactions", transactions);
      // console.log(JSON.stringify(transactions).length)
      res.status(200).json({ success: true, transactions });
    }
  );
}
