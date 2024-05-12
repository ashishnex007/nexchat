# Nexchat
## Run commands

### client 
`npm i`
<br>
`npm run dev`
### server
`cd backend`
<br>
`npm i`
<br>
`npm run dev`

## API Endpoints

### User Endpoints
POST - user register - http://localhost:3000/api/register
<br>
POST - user login - http://localhost:3000/api/login
<br>
GET - user search - http://localhost:3000/api?search=<user id>
<br>
GET - find friends - http://localhost:3000/api/user?search=<name>

### Chat Endpoints
POST - create chat - http://localhost:3000/api/chat
<br>
GET - fetch chats - http://localhost:3000/api/chat
<br>
POST - create group - http://localhost:3000/api/chat/group
<br>
PUT - rename group - http://localhost:3000/api/chat/rename
<br>
PUT - add user - http://localhost:3000/api/chat/groupadd
<br>
PUT - remove user - http://localhost:3000/api/chat/groupremove

### Message Endpoints
POST - send message - http://localhost:3000/api/message
<br>
GET - fetch all messages - http://localhost:3000/api/message/<id>
