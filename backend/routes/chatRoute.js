const express = require('express');
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {accessChat, fetchChats, groupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatController');

router.post("/",protect,accessChat);
router.get("/",protect,fetchChats);
router.post("/group",protect,groupChat);
router.put("/rename",protect,renameGroup);
router.put("/groupadd",protect,addToGroup);
router.put("/groupremove",protect,removeFromGroup);

module.exports = router;