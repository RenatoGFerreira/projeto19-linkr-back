export function extrairPostsPorHashtag(posts, hashtag) {
  const regex = new RegExp(`#${hashtag}\\b`, 'i');
  const postsComHashtag = posts.filter(post => regex.test(post.description));
  return postsComHashtag;
}
