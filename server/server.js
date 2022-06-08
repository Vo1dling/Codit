require("dotenv").config();
require("./db/mongoose");

const express = require("express");
// const path = require("path");
const cors = require("cors");
// const Page = require("./models/page");
const { getReact } = require("./api/controllers/utils/utils");
const apiRouter = require("./api/routers/api.router");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api", apiRouter);
server.use(express.static(getReact()));

const port = process.env.PORT || 5555;

server.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
