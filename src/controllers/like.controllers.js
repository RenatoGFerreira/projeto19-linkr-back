import { db } from "../database/database.js";

export async function insertLike(req, res) {
  const { likebyuser, postid } = req.body;

  try {
    await db.query(`
        INSERT INTO likes (likebyuser, postid)
        VALUES ( $1, $2 );`,
      [likebyuser, postid])

    await db.query(`
        UPDATE posts SET likes = likes + 1 WHERE id=$1;
    `, [postid] )
    
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteLike(req, res) {
  const { likebyuser, postid } = req.body;

  try {
    await db.query(`
        DELETE FROM likes
        WHERE likebyuser=$1
        AND postid=$2;
    `, [likebyuser, postid]);

    await db.query(`
        UPDATE posts SET likes = likes - 1 WHERE id=$1;
    `, [postid] )

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function totalLikes(req, res){
    const { postid } = req.body;

    try{
        const totalLikes = await db.query(`
        SELECT likes FROM posts WHERE id=$1;
        `, [postid])

        res.status(200).send(totalLikes)
    }catch(err){
        res.status(500).send(err.message);
    }
}
