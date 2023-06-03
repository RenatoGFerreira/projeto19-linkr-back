export default function extractHashtags(req, res, next) {
    const { description } = req.body;
  
    const regex = /#[a-zA-Z0-9_]+/g;
    const hashtags = description.match(regex);
  
    if (hashtags && hashtags.length > 0) {
      req.hashtags = hashtags.map((tag) => tag.substring(1));
    }
  
    next();
  }
  