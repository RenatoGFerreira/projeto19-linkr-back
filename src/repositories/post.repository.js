import { db } from "../database/database.js";

export function createPostDB(url, description, userId) {
  return db.query(
    `INSERT INTO posts (url, description, "userId")
        VALUES ($1, $2, $3);`,
    [url, description, userId]
  );
}

export function getPostDB() {
  return db.query(`
    SELECT u.id, u.username, u.image, p.description, p.url, p.likes
    FROM users u
    INNER JOIN posts p
    ON u.id = p."userId"
    ORDER BY p.id DESC
    LIMIT 20;
  `);
}
