import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import env from "dotenv"
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import session from "express-session";
import jwt from 'jsonwebtoken';
import pool from "./db.js"

const app = express()
const port = 3000
const saltRounds = 10;

env.config();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "DELETE", "PATCH"],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 1
  }
}))


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('No token provided.');
    return res.status(403).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Ensure it splits 'Bearer <token>'
  if (!token) {
    console.log('Token not in the correct format.');
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    req.userID = decoded.id;
    req.username = decoded.username;
    console.log('Token verified successfully:', decoded);

    next();
  });
};



app.get("/api/posts", verifyToken, async (req, res) => {
  console.log("API request")

  try {
    const request = await pool.query("SELECT postid, content, username, email, date, edited FROM posts INNER JOIN users ON users.userid = posts.author_id ORDER BY postid DESC");

    if (request.rows.length > 0) {
        return res.json({posts: request.rows})
    }  else {
        console.log("No Data: ", request.rows)
        return res.json({posts: request.rows})
    }
  } catch (err) {
    console.log(err);
  }
})


app.post("/api/addPost", verifyToken, async (req, res) => {

  const { content } = req.body
  const { userID } = req

  try {
    const d = new Date()
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()

    const date = `${day}-${month}-${year}`

    const result = await pool.query(
      "INSERT INTO posts (content, author_id, date, edited) VALUES ($1, $2, $3, false) RETURNING *",
      [content, userID, date]
    );

    res.json({ message: "Success!", success: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server issues... Try again later ", success: false })
  }
})


app.get('/api/userPosts', async (req, res) => {
  const data = req.query
  const { username, email } = data
  try {
    const request = await pool.query("SELECT postid, content, username, email, date, edited FROM posts INNER JOIN users ON users.userid = posts.author_id WHERE username = $1 AND email = $2 ORDER BY postid DESC", [username, email]);

    if (request.rows.length > 0) {
        return res.json({posts: request.rows})
    }  else {
        console.log("No User Posts: ", request.rows)
        return res.json({posts: request.rows})
    }
  } catch (err) {
    console.log(err);
  }
})



// Handle form submission
app.post('/api/register', async (req, res) => {
    const data = req.body;
    const {username, email, passwd} = data

    try {
        const checkEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        const checkUsername = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (checkUsername.rows.length > 0) {
            return res.json({message: "Username already taken. Try another one!", success: false})
        } else if (checkEmail.rows.length > 0) {
            return res.json({message: "Email already exists. Try logging in.", success: false})
        } else {
          //hashing the password and saving it in the database
          bcrypt.hash(passwd, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              console.log("Hashed Password:", hash);
              const result = await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hash]
              );
              return res.json({message: "Success! Now log in!", success: true})
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
});


app.post("/api/login", async (req, res) => {
    const data = req.body;
    const {email, passwd} = data

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            bcrypt.compare(passwd, storedHashedPassword, (err, valid) => {
              if (err) {
                //Error with password check
                console.error("Error comparing passwords:", err);
                return res.json({message: "Incorrect password! Try Again", success: false})
              } else {
                if (valid) {
                  //Passed password check
                  const accessToken = jwt.sign({ username: user.username, id: user.userid }, process.env.SECRET, { expiresIn: "1h" })
                  // console.log(req.session.username)
                  return res.json({
                    message: "Welcome back! Login successful", 
                    success: true, 
                    accessToken,
                    username: user.username,
                    email: user.email,
                    pfp: user.pfp_nr,
                    bio: user.bio
                  })
                } else {
                  //Did not pass password check
                  return res.json({message: "Incorrect password! Try Again", success: false})
                }
              }
            });
        } else {
            return res.json({message: "User not found! Try Signing up", success: false})
        }
    } catch (err) {
        console.log(err)
        return res.json({message: "Server issue... try again later", success: false})
    }
})

app.patch("/api/posts/edit/:id", verifyToken, async (req, res) => {
  const { email, username, content, id } = req.body.data
  console.log(req.body.data)

  try {
    const d = new Date()
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()

    const date = `${day}-${month}-${year}`

    const result = await pool.query(
      `UPDATE posts
        SET content = $1, date = $2, edited = true
        WHERE postid = $3 AND author_id = (
        SELECT userid FROM users WHERE username = $4 AND email = $5
       )`, 
      [content, date, id, username, email]
    );
    

    // if (result.rows.length === 0) {
    //   return res.status(404).json({ message: "Post not found or you're not authorized to delete this post." });
    // }

    res.status(200).json({ message: "Post edited successfully.", success: true });
  } catch (err) {
    console.error("Can't edit post: " + err);
    res.status(500).json({ message: "An error occurred while editing the post." });
  }
})


app.delete("/api/posts/delete/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const { email, username } = req.body;
  console.log("DELETING POST " + id)
  console.log(email, username)

  try {
    const result = await pool.query(
      `DELETE FROM posts 
       WHERE postid = $1 AND author_id = (
         SELECT userid FROM users WHERE username = $2 AND email = $3
       )`, 
      [id, username, email]
    );
    

    // if (result.rows.length === 0) {
    //   return res.status(404).json({ message: "Post not found or you're not authorized to delete this post." });
    // }

    res.status(200).json({ message: "Post deleted successfully." });
    console.log("POST DELETED HIHIHI")
  } catch (err) {
    console.error("Can't delete post: " + err);
    res.status(500).json({ message: "An error occurred while deleting the post." });
  }
});


app.get("/api/likes/get/:id", async (req, res) => {
  const postid = req.params.id * 1
  const {email, username} = req.query
  try {
    const result1 = await pool.query(
      `SELECT COUNT(*) 
        FROM likes 
        WHERE post_id = $1;`, 
      [postid]
    );
    console.log("RESULT: ", result1.rows)
    const result2 = await pool.query(
      `SELECT * FROM likes 
        WHERE post_id = $1 
        AND username = $2 AND email = $3`, 
      [postid, username, email])

    return res.json({ 
      likes: result1.rows,
      liked: result2.rows.length != 0 ? true : false
    })
  } catch (err) {
    console.error("Can't get post's likes: " + err);
    res.status(500).json({ message: "An error occurred while getting a likes." });
  }
})


app.post("/api/likes/post/:id", async (req, res) => {
  const postid = req.params.id * 1
  const { email, username } = req.body.data
  console.log(req.body.data)
  try {
    const result = await pool.query(
      `INSERT INTO likes (post_id, username, email) 
      VALUES ($1, $2, $3)`, 
      [postid, username, email]
    );

    return res.status(200).json({ message: "Post liked successfully.", success: true })
  } catch (err) {
    console.error("Can't like a post: " + err);
    res.status(500).json({ message: "An error occurred while liking a post." });
  }
})


app.delete("/api/likes/delete/:id", async (req, res) => {
  const postid = req.params.id * 1
  console.log("DISLIKE: ", req.body)
  const { email, username } = req.body
  try {
    const result = await pool.query(
      `DELETE FROM likes WHERE post_id = $1 AND username = $2 AND email = $3`, 
      [postid, username, email]
    );

    return res.status(200).json({ message: "Disliked post successfully.", success: true })
  } catch (err) {
    console.error("Can't dislike a post: " + err);
    res.status(500).json({ message: "An error occurred while disliking a post." });
  }
})

app.patch("/api/user/update", verifyToken, async (req, res) => {
  const { username, email, bio, pfp_nr } = req.body
  console.log("USERINFOOOOO:", req.body)
  console.log("222222222222:", username, email, bio, pfp_nr)

  try {
    const result = await pool.query(
      `UPDATE users
        SET pfp_nr = $1, bio = $2 
        WHERE userid = (
        SELECT userid FROM users WHERE username = $3 AND email = $4
       )`, 
      [pfp_nr, bio, username, email]
    );

    res.status(200).json({ message: "User Info updated.", success: true });
  } catch (err) {
    console.error("Can't edit post: " + err);
    res.status(500).json({ message: "An error occurred while updating user page." });
  }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})

