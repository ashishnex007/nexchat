const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        chatName : {type:String, trim: true},
        isGroupChat:{type:Boolean, default:false},
        users: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref:"User"
            },
        ],
        latestMessage:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User",
        },
    },
    {
        timestamps:true,
    }
)

const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;