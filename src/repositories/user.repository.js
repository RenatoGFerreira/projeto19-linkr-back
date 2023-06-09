import { db } from "../database/database.js";

export function getPosts(id) {

  return db.query(`SELECT  p.*, u.username AS name, u.image, u.id AS "userId", 
  m.title AS titlemeta, 
  m.description AS descriptionmeta, 
  m.image AS imagemeta
  FROM posts p
  JOIN users u ON u.id = p."userId"
  JOIN metadata m ON m."postId" = p.id
  WHERE "userId"=$1
  GROUP BY p.id, u.id, p.description, p.likes, u.username,
  u.image, m.title, m.description, m.image
  ORDER BY p."createdAt" DESC LIMIT 20;`, [id]);
}