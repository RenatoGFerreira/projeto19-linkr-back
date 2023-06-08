import { db } from "../database/database.js";

export function metadataDB(title, description, image, postId) {
  return db.query(
    `INSERT INTO metadata (title, description, image, "postId")
        VALUES ($1, $2, $3, $4)`,
        [title, description, image, postId]
  );
}
