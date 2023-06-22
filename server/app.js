const express = require("express");
const cors = require("cors");
const User = require('./models/user');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}))



const DB = process.env.DATABASE;


mongoose.connect(DB).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("not connected to database");
});



app.get("/register",(req,res)=>{
    res.json({"name":"aman"});
})



app.post("/register", async (req,res)=>{
   
    const name=req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email:email});

    if(user){
        console.log(user);
        res.json({exist:"1"});
    }else{
        const user2 = new User({ name: name, email: email, password: password, });
         user2.save().then(() => {
            res.json({ exist: "0" ,saved:"1"});
        }).catch((err) => res.json({exist:"0",saved:"0"}));

    }
    
})


app.listen(4000, () => {
    console.log("Server listening on port " + 4000);
});