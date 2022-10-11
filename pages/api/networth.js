const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "celsius",
});

connection.connect(() => {
  console.log("Connected to MySQL!");
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

  connection.query(query, function (error, rows, fields) {
    if (error) {
      res.json({
        success: false,
        error: error.message,
        version: "v1",
      });
      return;
    }
    res.status(200).json({ people: rows });
  });
}
