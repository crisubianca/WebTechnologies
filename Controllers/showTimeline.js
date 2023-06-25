const { auth } = require("../utils");
const timelineRepository = require("../Models/timelineRepository");
const mime = require("mime");

async function showTimelineController(req, res) {
  let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "GET":
        showTimeline(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

async function showTimeline(req, res) {

    const childId = req.url.split("=")[1];
    console.log("childId", childId);
  try {
    timelineRepository
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
    showTimeline,
};