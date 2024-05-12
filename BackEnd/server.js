import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import pg from "pg"

const app = express()
const port = 3000


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "usersLogin",
    password: "Evaluation1",
    port: 5432
})
  
// db.connect()
  
// db.query("SELECT * FROM flags", (err, res) => {
//     if(err) {
//       console.log("Error executing query ", err.stact)
//     } else {
//       quiz = res.rows
//     }
//     db.end()
// })


// Handle form submission
app.post('/api/submit-form', (req, res) => {
    const data = req.body;
    
    const {fName, lName, username, age, email, passwd, conPasswd} = data


    console.log('Received data:', data);
    res.status(200).send('Form data received successfully');
  });




app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})

