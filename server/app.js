const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/image", express.static(__dirname + "/uploads"));

dotenv.config();

app.listen(3060, () => console.log("서버켜짐"));

const joinRouter = require("./routes/joins");
const loginRouter = require("./routes/login");
const tokenRouter = require("./routes/token");
const boardRouter = require("./routes/board");
const commentRouter = require("./routes/comment");
const scheduleRouter = require("./routes/schedule");
const playerRouter = require("./routes/player");
const voteRouter = require("./routes/vote");

app.use("/join", joinRouter);
app.use("/login", loginRouter);
app.use("/token", tokenRouter);
app.use("/board", boardRouter);
app.use("/comment", commentRouter);
app.use("/schedule", scheduleRouter);
app.use("/player", playerRouter);
app.use("/vote", voteRouter);
