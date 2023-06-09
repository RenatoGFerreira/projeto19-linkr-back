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
    SELECT  u.id AS "userId", p.id, u.username AS name, u.image, p.description, p.url, p.likes
    FROM users u
    INNER JOIN posts p
    ON u.id = p."userId"
    ORDER BY p.id DESC
    LIMIT 20;
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

export function updatePostDB( id, description) {
  return db.query(
    `UPDATE posts SET description=$1 WHERE id=$2`, [description, id]
  );
}

export function createCurtComment(comments, postId, userId) {
  return db.query(
    `INSERT INTO "curtComments" (comments, "postId", "userId")
        VALUES ($1, $2, $3)`,
    [comments, postId, userId]
  );
}

export function getComment(postId) {
  return db.query(
    `SELECT  u.id AS "userId", u.username AS name, u.image, c."postId", c.comments, c.likes
    FROM users u
    INNER JOIN "curtComments" c
    ON u.id = c."userId"
    WHERE c."postId" = $1`, [postId]
  );
}


export function nComments(postId) {
  return db.query(
    `SELECT COUNT(*) AS "NumComentarios"
    FROM "curtComments"
    WHERE "postId"=$1`, [postId]
  );
}

export function updateLike(likes, userId, postId) {
  return db.query(
    `UPDATE "curtComments" SET likes=$1 WHERE "postId"=$2`, [likes, postId]
  );
}
