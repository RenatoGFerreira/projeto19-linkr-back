import { db } from "../database/database.js";

export function createPostDB(url, description, session) {
  return db.query(
    `INSERT INTO publication (url, description, "userId")
        VALUES ($1, $2, $3)`,
    [url, description, session]
  );
}

export function getPostDB() {
  return db.query(`
    SELECT u.id, u.name, u.image, p.description, p.url
    FROM users u
    INNER JOIN publications p
    ON u.id = p."userId"
    ORDER BY p.id DESC
    LIMIT 20
  `);
}
