import { db } from "../database/database.js";

export function createPostDB(url, description, userId) {
  return db.query(
    `INSERT INTO posts (url, description, "userId")
        VALUES ($1, $2, $3) RETURNING id`,
    [url, description, userId]
  );
}
export function getPostDB() {
  return db.query(`
    SELECT  p.*, u.username AS name, u.image, u.id AS "userId", 
        m.title AS titlemeta, 
        m.description AS descriptionmeta, 
        m.image AS imagemeta
    FROM posts p
    JOIN users u ON u.id = p."userId"
    JOIN metadata m ON m."postId" = p.id
    GROUP BY p.id, u.id, p.description, p.likes, u.username,
        u.image, m.title, m.description, m.image
    ORDER BY p."createdAt" DESC LIMIT 20;
  `);
}

export function deletePostDB(id) {
  return db.query(
    `DELETE FROM posts WHERE id=$1`, [id]
  );
}

export function getPostIdDB(id) {
  return db.query(
    `SELECT * FROM posts WHERE id=$1`, [id]
  );
}

export function updatePostDB(id, description) {
  return db.query(
    `UPDATE posts SET description=$1 WHERE id=$2`, [description, id]
  );
}


export function getPostCountDB() {
  return db.query(`
    SELECT COUNT(*) AS postCount FROM posts;
  `).then(result => result.rows[0].postcount);
}
