const { createPromisifiedDB } = require("../../../utils/db");
const { handle } = require("../../../utils/response");

const db = createPromisifiedDB(
  process.env.NW_DATABASE_PATH || "./sqlite-pass-4/nw.sqlite3",
  (error) => {
    if (error) {
      console.log("sqlite error", error);
    }
  }
);

db.serialize(() => {
  console.log("ready");
});

async function assets(req) {
  const { username } = req.query;
  let query = `SELECT * FROM People
  LEFT JOIN Assets ON Assets.schedule = People.schedule
  WHERE People.name = ?`;
  const assets = await db.all(query, [username]);
  const total = assets
    ? assets.reduce((acc, asset) => {
        return acc + asset.usd;
      }, 0)
    : 0;
  return { total };
}

export default function handler(req, res) {
  return handle(req, res, assets);
}
