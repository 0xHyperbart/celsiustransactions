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

async function perform(req) {
  const { type } = req.query;
  let query;
  if (type == "individual") {
    query = `SELECT * FROM People WHERE People.address = 'ADDRESS REDACTED' ORDER BY networth DESC LIMIT 50`;
  } else if (type == "entity") {
    query = `SELECT * FROM People WHERE People.address != 'ADDRESS REDACTED' ORDER BY networth DESC LIMIT 50`;
  } else if (type == "both") {
    query = `SELECT * FROM People ORDER BY networth DESC LIMIT 50`;
  } else {
    throw new Error("Invalid type");
  }

  const people = await db.all(query);
  return { people };
}

export default async function handler(req, res) {
  return handle(req, res, perform);
}
