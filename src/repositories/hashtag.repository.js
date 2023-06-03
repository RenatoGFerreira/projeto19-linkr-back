import { db } from "../database/database.js";

export async function createHashtagsDB(postId, hashtags) {
  const values = hashtags.map((tag) => [postId, tag]);

  await db.query(
    `
    INSERT INTO hashtags ("postId", name)
    VALUES ${values.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(", ")}
  `,
    values.flat()
  );
}

export async function getPostsByHashtagDB(hashtag) {
  return db.query(
    `
    SELECT p.*
    FROM posts p
    INNER JOIN hashtags h ON p.id = h."postId"
    WHERE h.name = $1
    ORDER BY p.id DESC
    LIMIT 20;
  `,
    [hashtag]
  );
}

export async function getHashtagRankingDB() {
  return db.query(
    `
    SELECT h.name, COUNT(*) AS postCount
    FROM hashtags h
    GROUP BY h.name
    ORDER BY postCount DESC;
  `
  );
}
