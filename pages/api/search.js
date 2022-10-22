const { createPromisifiedDB } = require("../../utils/db");
const { handle } = require("../../utils/response");

const db = createPromisifiedDB(
  process.env.DATABASE_PATH || "./sqlite-pass-4/db.sqlite3",
  (error) => {
    if (error) {
      console.log("sqlite error", error);
    }
  }
);

db.serialize(() => {
  console.log("ready");
});

const SHOWING_LIMIT = 2000;

async function search(req) {
  const { query } = req.body;
  if (!query) {
    return {
      txs: null,
      totalCount: 0,
      showingCount: 0,
    };
  }

  if (query.length < 3) {
    throw Error("Query must be at least 3 characters");
  }

  let transactions = await db.all(
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
    query
  );

  let totalCount = transactions.length;
  let showingCount = transactions.length;
  if (transactions.length > SHOWING_LIMIT) {
    transactions = transactions.slice(0, SHOWING_LIMIT);
    showingCount = SHOWING_LIMIT;
  }
  const txs = transactions.map((tx) => Object.values(tx));

  return {
    txs,
    totalCount,
    showingCount,
  };
}

export default function handler(req, res) {
  return handle(req, res, search);
}
