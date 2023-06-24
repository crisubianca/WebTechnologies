const { viewSchedule } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const childRepository = require("../Models/childRepository");
const userRepository = require("../Models/userRepository");
const scheduleRepository = require("../Models/scheduleRepository");
const bcrypt = require("bcrypt");
const mime = require("mime");
const jwt = require("jsonwebtoken");

async function fsScheduleController(req, res) {
  let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "GET":
        res.end(viewSchedule, "utf8");
        break;
      case "POST":
        fsSchedule(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}



async function fsSchedule(req, res) {
  try{
    // const childId = req.url.split("=")[1];

    const body = await getPostData(req);
    const { date, time, information, activity, child_id } = body;
    const schedule = {
      child_id,
      date,
      time,
      information,
    };
    // console.log("activity", activity);
    if(activity === "eat"){
      // console.log("sunt aici");
      scheduleRepository
        .createEat(schedule)
        .then((data) => {
          console.log("Data", data);
        })
        .catch((err) => {
          console.log(err);
          res.writeHead(401, { "Content-Type": mime.getType(".txt") });
          res.end("child doesn't exist");
        })
    }
    else{
      scheduleRepository
        .createSleep(schedule)
        .then((data) => {
          console.log("Data", data);
        })
        .catch((err) => {
          console.log(err);
          res.writeHead(401, { "Content-Type": mime.getType(".txt") });
          res.end("child doesn't exist");
        })
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
    fsScheduleController,
};