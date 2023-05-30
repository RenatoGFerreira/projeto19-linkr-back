import { db } from "../database/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { username, email, password, image } = req.body;

  try {

    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
    if (user.rowCount !==0) return res.status(404).send("Email já cadastrado");
    

    const hash = bcrypt.hashSync(password, 10);
    await db.query(`INSERT INTO users VALUES ($1,$2,$3,$4)`, [email, hash, username, image] )

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}