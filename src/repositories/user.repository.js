import { db } from "../database/database.js";

export function getPosts(id) {

  return db.query(`
      SELECT u.id as "userId", u.username, u.image, p.description, p.id, p.url, p.likes
      FROM users u
      INNER JOIN posts p
      ON u.id = p."userId"
      WHERE "userId"=$1
      ORDER BY p.id DESC
      LIMIT 20;
    `, [id]);
}