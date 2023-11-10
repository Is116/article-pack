require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const createSocketIO = require("./routs/socket");
const connectToDatabase = require("./db");
const authRoute = require('./routs/auth');
const articlesRoute = require('./routs/articles');

const app = express();
const server = http.createServer(app);


createSocketIO(server);

connectToDatabase();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoute);
app.use('/api/articles', articlesRoute);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
