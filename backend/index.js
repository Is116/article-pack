require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const createSocketIO = require("./routs/socket");
const connectToDatabase = require("./db");
const authRoute = require('./routs/auth');
const articlesRoute = require('./routs/articles');
const commentsRoute = require('./routs/comments');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);



createSocketIO(server);

connectToDatabase();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoute);
app.use('/api/articles', articlesRoute);
app.use('/api/comments', commentsRoute(io));


// io.on("connection", (socket) => {
//   console.log("Client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
