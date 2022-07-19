const mongoose = require("mongoose")
const Schema=mongoose.Schema

const BookmarkSchema= Schema({
    name:String,
    url:String
})

const Bookmark = mongoose.model("bookmark",BookmarkSchema)

module.exports=Bookmark