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
  const type = req.query.type;
  let query;
  if (type == "individual") {
    query = `SELECT * FROM People WHERE People.address = 'ADDRESS REDACTED' ORDER BY networth DESC LIMIT 50`;
  } else if (type == "entity") {
    query = `SELECT * FROM People WHERE People.address != 'ADDRESS REDACTED' ORDER BY networth DESC LIMIT 50`;
  } else if (type == "both") {
    query = `SELECT * FROM People ORDER BY networth DESC LIMIT 50`;
  } else {
    res.json({
      success: false,
      error: "Invalid type",
      version: "v1",
    });
    return;
  }

  db.all(query, function (error, rows) {
    if (error) {
      res.json({
        success: false,
        error: error.message,
        version: "v1",
      });
      return;
    }
    res.status(200).json({ 
      success: true,
      people: rows,
      version: "v1",
     });
  });
}
