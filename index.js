import express from "express";
import axios from "axios";

var app=express()
const PORT=3000

const key=""

app.use(express.urlencoded({extended:true}))

app.listen(PORT)

app.get("/",(req,res)=>{
    res.render("index.ejs")}
    )



function bookConstruct(data){
    var bookList=[]
    for (const key in data["items"]) {
        var title=data["items"][key]["volumeInfo"]["title"];
        
        if (data["items"][key]["volumeInfo"]["description"]) {
            var description=data["items"][key]["volumeInfo"]["description"];
        } else {
            var description="Not available"
        }
        
        
        if (data["items"][key]["volumeInfo"]["subtitle"]) {
            var title=title+":"+data["items"][key]["volumeInfo"]["subtitle"];
        };

        if (data["items"][key]["volumeInfo"]["authors"]) {
            var author=data["items"][key]["volumeInfo"]["authors"];
        } else {
            var author="Not available"
        }

        bookList.push({
            "title":title,
            "description":description,
            "author":author
        })
    };
    return bookList
}

app.post("/submit",async (req,res)=>{
    var type=req.body["type"];
    var content=req.body["content"]
    let request=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${type}:${content}&key=${key}`)
    var obj=bookConstruct(request.data)
    console.log(obj);
    res.render("index.ejs",{book:obj})
});