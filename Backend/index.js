const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const mongoose = require('mongoose');
const Bookmark = require('./modals/Bookmark');



// create express app
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/final", {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// getting data from db
app.get('/getbookmarks', async (req, res) => {

    const bookmarks=await Bookmark.find()
    res.json({bookmarks:bookmarks})
});

// search data from db
app.get('/getbookmark/:name', async (req, res) => {
    // searching by value
    const name=req.params.name
    const bookmarks=await Bookmark.find({name:name})
    res.json({bookmarks:bookmarks})
});


// adding bookmark to database

app.post('/addbookmark', async (req, res) => {

    await Bookmark.create(req.body)
    res.send({status:"success"})
});


app.post('/deletebookmark/:id', async (req, res) => {
    const id = req.params.id
    await Bookmark.remove({_id:id})
    res.json({status:"success"})
});

// updating data from db
app.post('/updatebookmark/:id', async (req,res) => {
    const {name,url}= req.body

    await Bookmark.updateOne({_id:req.params.id}, {
        name: name ,
        url: url
    }) 
    res.json({status:"success"})
});



// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 3000");
});