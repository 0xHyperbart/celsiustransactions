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
  const username = req.query.username;
  let query = `select * from people
  left join assets on assets.schedule = people.schedule
  where people.name = ?`

  connection.query(query, [username], function (error, rows, fields) {
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
