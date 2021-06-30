const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const saltRounds = 10;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://admin-akash:Ak@sh1998@cluster0.6k7so.mongodb.net/gameDB?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
const userschema = new mongoose.Schema({
    username:String,
    password:String
});

const User = mongoose.model("User", userschema);

app.get("/", function(req,res){
    res.render("index" ,{cname: "none", user:"User", outname:"none"});
})

app.post("/", function(req,res){
    const hash = bcrypt.hashSync(req.body.password,saltRounds);
        const newuser = new User({
        username : req.body.username,
        password : hash
    });
    
    User.countDocuments({username :req.body.username}, function(err,result){
        if(result > 0){
            res.render("index" ,{cname: "alerti", user:"User", outname:"none"});
        }else{
            newuser.save(function(err){
                if(!err){
                    res.render("index",{cname: "after_reg" ,user:"User", outname:"none"});
                }else{
                    res.send(err);
                }
            });
        }
    })  
});

app.post("/login", function(req,res){
    const login_user = req.body.login_username;
    const login_pass = req.body.login_password;
    User.findOne({username: login_user},function(err,result){
        if(!err){
            bcrypt.compare(login_pass,result.password,function(err,result_hash){
                 if(result_hash == true){
                res.render("index",{cname: "after_reg" ,user: login_user, outname:"logout"});
                 }else{
                     res.render("index",{cname: "wrong-password", user:"User", outname:"none"});
                 }
            })
            }else{
                res.render("index",{cname: "wrong-password", user:"User", outname:"none"});
            }
    });
});

app.listen(3000, function(){
    console.log("game started");
});