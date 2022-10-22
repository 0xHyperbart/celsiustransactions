const sqlite3 = require("sqlite3").verbose();
module.exports.createPromisifiedDB = function createPromisifiedDB(
  path,
  cbError
) {
  const sqliteDB = new sqlite3.Database(path, sqlite3.OPEN_READONLY, cbError);
  return {
    serialize(cb) {
      sqliteDB.serialize(cb);
    },
    all(query, params) {
      return new Promise((resolve, reject) => {
        sqliteDB.all(query, params, function (error, rows) {
          if (error) {
            reject(error);
          }
          resolve(rows);
        });
      });
    },
  };
};
