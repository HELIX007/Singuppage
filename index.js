//jshint esversion:6

var express=require("express");
var bodyParser=require("body-parser");


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nagasai:DNS26mongo@nagasai.x65eszr.mongodb.net/Signup');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://nagasai:DNS26mongo@nagasai.x65eszr.mongodb.net/Database";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("Database").collection("users");
//   // perform actions on the collection object
//   client.close();
// });

var app=express();


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


var db = mongoose.connection;
db.on('error', ()=>console.log("error in connecting to MongoDB"));
db.once('open',()=>console.log("Connection established to MongoDB"));
const schema =mongoose.Schema;


const UserSchema={
  fname:String,
  lname:String,
  email:String,
  pass:String
};

const user =new mongoose.model('user',UserSchema);


// Getting Index page
app.get('/', (req, res) => {
 res.render('index.html');
}).listen(3000);


//Getting Input from form and Storing in Database
app.post('/',function(req,res){
        const newUser = {
          fname:req.body.firstname,
          lname:req.body.lastname,
          email:req.body.email,
          pass:req.body.password
        };

        db.collection('users').insertOne(newUser,function(err, collection){
            if (err) throw err;
            console.log("Record inserted Successfully");

        });

        return res.redirect('/success.html');
    });



