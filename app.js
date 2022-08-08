const express = require("express");
const mongoose = require("mongoose");

const User = require("./model/user");

require("dotenv/config");

const app = express();

app.use(express.json());  //middle ware, this one allows a json to be posted

app.get("/", (req, res) => {
    res.send("First Request!!!!!");
});

app.get("/users", (req, res) => {
    let users = ["shit", "ok", "asshole", "damn"];
    res.send({
        users: users
    });
});

app.post("/create_user", async (req,res) => {
    try{
        const myUser = new User(req.body);
        await myUser.save();
        res.send(myUser); 
        console.log("Trying to send");
    } catch(err){
        res.send({ message: err });
        console.log("error");
    }
});

mongoose.connect(process.env.DB_CONNECTION_STRING, 
{useUnifiedTopology: true, useNewURLParser: true},
(req,res)=>{
    console.log("Connected to database???");
})

app.listen(3000,()=>{
    console.log("Listening to 3000");
});


///////////////////////////////////////
// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string                                                                      
// const url = "mongodb+srv://Trav:RdRF7bcfq%21V%21u2z@cluster0.xcr0hby.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);