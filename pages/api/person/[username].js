const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  process.env.NW_DATABASE_PATH || "./sqlite-pass-4/nw.sqlite3",
  sqlite3.OPEN_READONLY,
  (error) => {
    if (error) {
      console.log("sqlite error", error);
    }
  }
);

db.serialize(() => {
  console.log("ready");
});

export default function handler(req, res) {
  const username = req.query.username;
  let query = `SELECT * FROM People
  LEFT JOIN Assets ON Assets.schedule = People.schedule
  WHERE People.name = ?`

  db.all(query, [username], function (error, rows) {
    if (error) {
      res.json({
        success: false,
        error: error.message,
        version: "v1",
      });
      return;
    }
    res.status(200).json({ assets: rows });
  });
}
