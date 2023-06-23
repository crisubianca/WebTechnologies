const { viewHomePage } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const childRepository = require("../Models/childRepository");
const userRepository = require("../Models/userRepository");
const bcrypt = require("bcrypt");
const mime = require("mime");
const jwt = require("jsonwebtoken");

async function showProfilesController(req, res) {
  let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "GET":
        showProfiles(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

async function showProfiles(req, res) {
    console.log("SUNT AICI");
  let user = auth(req, res);
  try {
    const user_id = await userRepository
      .returnIdByUsername(user.username)
      .then((parentId) => {
        return parentId;
      });
      console.log("user id", user_id);
    childRepository
      .findByParentId(user_id)
      .then((childData) => {
        // console.log("Child data", childData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(childData));
      })
      .catch((err) => {
        console.log(err);
        res.writeHead(401, { "Content-Type": mime.getType(".txt") });
        res.end("user_id doesn't exist");
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    showProfilesController,
};