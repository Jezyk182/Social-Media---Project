import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import pg from "pg"
import env from "dotenv"
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express()
const port = 3000
const saltRounds = 10;

env.config();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET"],
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
    secure: false,
    maxAge: 1000 * 60 * 60 * 1
  }
}))


const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  
db.connect()


app.get("/api", async (req, res) => {
  console.log("API request")



  try {
    const request = await db.query("SELECT content, username, email, likes FROM posts INNER JOIN users ON users.userid = posts.author_id");

    if (request.rows.length > 0) {
        return res.json({posts: request.rows})
    }  else {
      return res.json({success: false})
    }
  } catch (err) {
    console.log(err);
  }
})

app.post("/api/addPost", async (req, res) => {
  if(req.session.username) {
    const data = req.body
    const content = data.content

    try {
      const user = await db.query("SELECT userid FROM users WHERE username = $1", [req.session.username])
      const userid = user.rows[0].userid
      console.log(userid)
      const d = new Date()
      const day = d.getDay()
      const month = d.getMonth()
      const year = d.getFullYear()

      const date = `${day}-${month}-${year}`
      console.log(date)

      const result = await db.query(
        "INSERT INTO posts (content, author_id, date, likes, comments_count) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [content, userid, date, 0, 0]
      );

      return res.json({message: "Success!", success: true})
    } catch (err) {
      console.log(err);
    }
      return res.json({success: true, username: req.session.username})
  } else {
    return res.json({success: false})
   }
  
})



// Handle form submission
app.post('/api/register', async (req, res) => {
    const data = req.body;
    const {username, email, passwd} = data

    try {
        const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        const checkUsername = await db.query("SELECT * FROM users WHERE username = $1", [username]);

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
              const result = await db.query(
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
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email])
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
                  req.session.username = user.username
                  console.log(req.session.username)
                  return res.json({
                    message: "Welcome back! Login successful", 
                    success: true, 
                    username: req.session.username
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

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})

