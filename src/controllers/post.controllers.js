import {
  createPostDB,
  getPostDB,
  deletePostDB,
  getPostIdDB,
  updatePostDB,
  getPostCountDB
} from "../repositories/post.repository.js";
import { extrairPostsPorHashtag } from "../middleware/extractHashtag.middleware.js";
import urlMetadata from "url-metadata";
import { metadataDB } from "../repositories/metadata.repository.js";
import fetch from "node-fetch";
global.fetch = fetch;

export async function sendPost(req, res) {
  const { url, description } = req.body;
  const session = res.locals.session;

  try {
    const userId = session.rows[0].userId;
    const {
      rows: [response],
    } = await createPostDB(url, description, userId);
    const postId = response.id;
    console.log(postId)

    const metadata = urlMetadata(url).then((response) => {
      console.log(response)
      const { title, image, description } = response;
      metadataDB(title, description, image, postId);
    }).catch((err) => {
      console.log(err)
    })

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPost(req, res) {
  try {
    const { rows: posts } = await getPostDB();

    console.log(posts)

    if (posts.rowCount === 0)
      return res.status(404).send({ message: "posts não existe!" });

    const hashtag = req.params.hashtag; // Obtém a hashtag a partir do parâmetro de caminho (path parameter)
    if (hashtag) {
      const postsComHashtag = extrairPostsPorHashtag(posts, hashtag);
      res.status(200).send(postsComHashtag);
    } else {
      res.status(200).send(posts);
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message:
          "An error occurred while trying to fetch the posts, please refresh the page",
      });
  }
}


export async function getPostsByHashtag(req, res) {
  try {
    const { rows: posts } = await getPostDB();
    if (posts.rowCount === 0) return res.status(404).send({ message: "posts não existe!" });

    const hashtag = req.params.hashtag; // Obtém a hashtag a partir do parâmetro de caminho (path parameter)
    const postsComHashtag = extrairPostsPorHashtag(posts, hashtag);
    res.status(200).send(postsComHashtag);
  } catch (error) {
    res.status(500).send({ message: "An error occurred while trying to fetch the posts, please refresh the page" });
  }
}

export async function deletePost(req, res) {
  const userId = res.locals.session.rows[0].userId;
  const { id } = req.body;

  try {
    const post = await getPostIdDB(id);
  
    if (!post.rows[0]) return res.status(404).send("Post não encontrado!");
    if (userId !== post.rows[0].userId) return res.status(404).send({ messagem: "O usuário não tem autorização para deletar este post!" })

    await deletePostDB(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updatePost(req, res) {
  const userId = res.locals.session.rows[0].userId;
  const { id, description } = req.body;
  try {
    const post = await getPostIdDB(id);
    if (!post.rows[0])
      return res.status(404).send({ messagem: "Post não encontrado!" });
    if (userId !== post.rows[0].userId)
      return res
        .status(404)
        .send({
          messagem: "O usuário não tem autorização para alterar este post!",
        });

    await updatePostDB(id, description);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}



export async function getTopHashtags(req, res) {
  try {
    const { rows: posts } = await getPostDB();

    if (posts.length === 0) {
      return res.status(404).send({ message: "Posts não existem!" });
    }

    const hashtagsMap = {};

    posts.forEach((post) => {
      const regex = /#\w+/g;
      const hashtags = post.description.match(regex);

      if (hashtags) {
        hashtags.forEach((tag) => {
          const hashtag = tag.toLowerCase();
          if (hashtagsMap[hashtag]) {
            hashtagsMap[hashtag]++;
          } else {
            hashtagsMap[hashtag] = 1;
          }
        });
      }
    });

    const hashtagsArray = Object.entries(hashtagsMap);

    hashtagsArray.sort((a, b) => b[1] - a[1]);

    const topHashtags = hashtagsArray.slice(0, 20).map((item) => item[0]);

    res.status(200).send(topHashtags);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Ocorreu um erro ao buscar as hashtags, por favor atualize a página" });
  }
}


export async function getPostCount(req, res) {
  try {
    const postCount = await getPostCountDB();
    res.status(200).send({ postCount });
  } catch (error) {
    res.status(500).send({ message: "An error occurred while trying to fetch the post count, please try again later" });
  }
}
