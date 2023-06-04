import { createPostDB, getPostDB,  deletePostDB, getPostIdDB} from "../repositories/post.repository.js";
import { createHashtagsDB } from "../repositories/hashtag.repository.js";


export async function sendPost(req, res) {
  const { url, description } = req.body;
  const { userId } = res.locals.session;

  try {
    const { rows: [result] } = await createPostDB(url, description, userId);

    if (hashtags && hashtags.length > 0) {
      await createHashtagsDB(result.id, hashtags);
    }

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

export async function deletePost(req, res) {
  const { userId } = res.locals.session;
  console.log(userId);
  const { postId, idUser } = req.body;
  console.log(postId, idUser);
  try {
    const post = await getPostIdDB(postId);
    if (!post.rows[0]) return res.status(404).send({ messagem: "Post não encontrado!" })

    if (userId!==idUser) return res.status(404).send({ messagem: "O usuário não tem autorização para deletar este post!" })
    
    await deletePostDB(postId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/* export async function updatePost(req, res) {
  const { id } = req.params;
  const { description } = req.body;
  try {
    await getPostDB(description, id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
} */
