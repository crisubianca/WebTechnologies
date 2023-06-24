const { viewTimeline } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const childRepository = require("../Models/childRepository");
const userRepository = require("../Models/userRepository");
const bcrypt = require("bcrypt");
const mime = require("mime");
const jwt = require("jsonwebtoken");

async function timelineController(req, res) {
  let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "GET":
        res.end(viewTimeline, "utf8");
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

module.exports = {
    timelineController,
};