import {db} from "../database/database.js"

export default async function validateAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
    // if (!session) return res.status(401).send("Token inválido!");

    // res.locals.session = session

    if (session.rowCount === 0) return res.status(401).send("Token inválido!");
      res.locals.userId = session.rows[0].userId

  } catch (err) {
    res.status(500).send(err.message);
  }
  next()
}