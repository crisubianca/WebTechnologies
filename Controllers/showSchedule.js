const { viewHomePage } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const scheduleRepository = require("../Models/scheduleRepository");
const bcrypt = require("bcrypt");
const mime = require("mime");
const jwt = require("jsonwebtoken");

async function showScheduleController(req, res) {
    let user = auth(req, res);
    if (!user) {
      console.log("user is not authorized");
      res.writeHead(401, { "Content-Type": "text/html" });
      res.end("Unauthorized", "utf8");
    } else {
      switch (req.method) {
        case "GET":
          showSchedule(req, res);
          break;
        default:
          res.writeHead(405);
          res.end();
      }
    }
}

async function showSchedule(req, res) {
    const childId = req.url.split("=")[1];
    console.log("childId", childId);
    try {
        scheduleRepository
          .getAllByChildId(childId)
          .then((childData) => {
            // console.log("Child data", childData);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(childData));
          })
          .catch((err) => {
            console.log(err);
            res.writeHead(401, { "Content-Type": mime.getType(".txt") });
            res.end("child_id doesn't exist");
          });
      } catch (error) {
        console.log(error);
      }
}


module.exports = {
    showScheduleController,
}
