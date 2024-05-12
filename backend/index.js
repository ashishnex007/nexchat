const run = require("./config/db");
run();
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routes/routes');
const chatRouter = require('./routes/chatRoute');
const messageRouter = require('./routes/messageRoutes');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/",(req, res) => {
    res.send("hi mom");
})

app.use("/api",router);
app.use("/api/chat",chatRouter);
app.use("/api/message",messageRouter);

app.listen(PORT,()=>{
    console.log(`PORT running on ${PORT}`);
});
