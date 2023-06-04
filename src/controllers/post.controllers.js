import { createPostDB, getPostDB } from "../repositories/post.repository.js";
// import { createHashtagsDB } from "../repositories/hashtag.repository.js";


export async function sendPost(req, res) {
  const { url, description } = req.body;
  const session = res.locals.session;

  const userId = session.rows[0].userId

  try {
    const { rows: [result] } = await createPostDB(url, description, userId);
  

    // if (hashtags && hashtags.length > 0) {
    //   await createHashtagsDB(result.id, hashtags);
    // }

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({message: "An error occured while trying to fetch the posts, please refresh the page"});
  }
}

export async function getPost(req, res) {
  try {
    const { rows: posts } = await getPostDB();

    if (posts.rowCount === 0) return res.status(404).send({ message: "posts não existe!" })

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({message: "An error occured while trying to fetch the posts, please refresh the page"});
  }
}
