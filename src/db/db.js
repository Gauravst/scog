import sqlite3 from "sqlite3";
import { open } from "sqlite";
const dbFilePath = "scog.db";

const dbConnect = async () => {
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
  return db;
};

export { dbConnect };
