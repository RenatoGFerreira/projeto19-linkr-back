import { db } from "../database/database.js";

export async function getUserPosts(req, res) {
    const { userId } = req.params;

    try {
        const posts = await db.query(`SELECT * FROM posts WHERE "userId"=$1`, [userId]);

        if (posts.rowCount === 0) return res.status(404).send("No posts yet");

        console.log(posts.rows);
        res.status(201).send(posts.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}