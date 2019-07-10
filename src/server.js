const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);


mongoose.connect("mongodb+srv://netrix:netrix@cluster0-e1xjx.mongodb.net/netrix?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

io.on("connection", socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('./files', express.static(path.resolve(__dirname, "..", "tmp")));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 3333);