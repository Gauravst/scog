const createUserSQL = `CREATE TABLE "user" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  "ssh" INTEGER UNIQUE)`;

const createGroupSQL = `CREATE TABLE "group" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  "name" TEXT NOT NULL,
  "branch" TEXT NOT NULL,
  "user" INTEGER, 
  FOREIGN KEY("user") REFERENCES "user"("id"));`;

const createFileSQL = `CREATE TABLE "file" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  "file" TEXT NOT NULL,
  "group" INTEGER,
  FOREIGN KEY("group") REFERENCES "group"("id"));`;

const getAllGroup = `SELECT * FROM "group"`;

const getUser = `SELECT * FROM "user" ORDER BY "id" LIMIT 1`;

export { createUserSQL, createGroupSQL, createFileSQL, getAllGroup, getUser };
