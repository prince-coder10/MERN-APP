const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { Server } = require("socket.io");

const { mongoose } = require("mongoose");
const app = express();
const chatApp = express();
const cookieParser = require("cookie-parser");
const { Socket } = require("dgram");

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

// caht app

chatApp.use(express.json());
chatApp.use(cookieParser());
chatApp.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
chatApp.use(express.urlencoded({ extended: false }));

const chatPORT = 3500;
const expressServer = chatApp.listen(3500, () =>
  console.log(`chat server listening on port ${chatPORT}`)
);

const io = new Server(expressServer, {
  cors: "http://127.0.0.1:3000",
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
});

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
