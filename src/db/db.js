import sqlite3 from "sqlite3";
const dbFilePath = "./src/db/scog.db";

const dbConnect = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

const runSQL = async (db, sql) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.exec(sql, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  });
};

const insertData = async (db, table, data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map(() => "?")
    .join(", ");
  const values = Object.values(data);

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  return runSQL(db, sql, values);
};

export { dbConnect, runSQL, insertData };
