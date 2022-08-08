
//<script src="insert-data.js"></script>

const express = require("express");
const {MongoClient} = require("mongodb");

//const User = require("./model/user");

require("dotenv/config");

const app = express();

app.use(express.json());  //middle ware, this one allows a json to be posted

app.get("/", (req, res) => {
    res.send("Second Request!");
});

app.get("/users", (req, res) => {
    let users = ["shit", "ok", "asshole", "damn"];
    res.send({
        users: users
    });
});


let personDoc = {}

app.post("/create_user", async (req,res) => {
     try{
    //     const myUser = new User();
    //     await myUser.save();
        
        personDoc = req.body; 
        res.send("Data received.");
        await run(personDoc).catch(console.dir);
        console.log(personDoc + "Sent to database");
    } catch(err){
        res.send({ message: err });
        console.log("error");
    }
});

app.listen(3000,()=>{
    console.log("Listening to 3000");
});




const url = "mongodb+srv://Trav:RdRF7bcfq%21V%21u2z@cluster0.xcr0hby.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
async function connect() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
connect().catch(console.dir);



async function run(personDocument) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const dbName = "Cluster0";

        const db = client.db(dbName);
        // Construct a document                                                                                                                                                              

        // Use the collection "people"
         const col = db.collection("people");
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
    } catch (err) {
        console.log(err.stack);
    }
     finally {
        await client.close();
    }
}