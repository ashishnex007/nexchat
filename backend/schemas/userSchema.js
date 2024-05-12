const mongoose = require("mongoose");

const userSchama = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg"},
},
{
    timestamps: true,
}
);

const User = mongoose.model("User",userSchama);

module.exports = User;