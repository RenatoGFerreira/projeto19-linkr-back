import { createPostDB, getPostDB } from "../repositories/post.repository.js";

export async function sendPost(req, res) {
  const { url, description } = req.body;
  const { session } = res.locals;

  try {
    const {
      rows: [result],
    } = await createPostDB(url, description, session);
    
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPost(req, res) {
  try {
    const { rows: posts } = await getPostDB();
    
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
