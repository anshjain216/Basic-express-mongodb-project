const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const chat = require("./models/chat");
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.listen(8080);
// const chat1= new chat({
//     from:"ansh",
//     to:"aashman",
//     msg:"hello how are you doing",
//     date: new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// }).catch(err=> console.log(err));
app.get("/",(req,res)=>{
    res.send("server is working")
})
app.get("/chat",async(req,res)=>{
    let chats = await chat.find();
    res.render("index.ejs",{chats});
})
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chat",async(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat= new chat({
        from:from,
        msg:msg,
        to:to,
        date: new Date()
    })
     await newChat.save();
    res.redirect("/chat");
})
app.get("/chat/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat1 = await chat.findById(id);
    res.render("edit.ejs",{chat1});
})
app.put("/chat/:id",async (req,res)=>{
     let {id} = req.params;
     let{msg : newmsg}=req.body;
    await chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
     res.redirect("/chat");
})
app.delete("/chat/:id/delete",async (req,res)=>{
    let {id} = req.params;
    await chat.findByIdAndDelete(id);
    res.redirect("/chat");
})