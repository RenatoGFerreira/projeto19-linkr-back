import { getPostsByHashtagDB, getHashtagRankingDB } from "../repositories/hashtag.repository.js";

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params;

  try {
    const { rows: posts } = await getPostsByHashtagDB(hashtag);
    const hashtagRanking = await getHashtagRankingDB();

    if (posts.length === 0) {
      return res.status(404).send({ message: "No posts found for the hashtag." });
    }

    res.status(200).send({ posts, hashtagRanking });
  } catch (error) {
    res.status(500).send({ message: "An error occurred while trying to fetch the posts, please refresh the page." });
  }
}

export async function getHashtagRanking(req, res) {
  try {
    const hashtagRanking = await getHashtagRankingDB();

    res.status(200).send(hashtagRanking);
  } catch (error) {
    res.status(500).send({ message: "An error occurred while trying to fetch the hashtag ranking, please refresh the page." });
  }
}
