const { viewTimeline } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const timelineRepository = require("../Models/timelineRepository");
const mime = require("mime");

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
      case "POST":
        timeline(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

async function timeline(req, res) {
  const body = await getPostData(req);
  console.log(body);
  const { child_id, date, timelineTitle, timelineInfo } = body;

  const entry = {
    child_id,
    date,
    timelineTitle,
    timelineInfo,
  };
  console.log("entry", entry);
  timelineRepository
    .create(entry)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(401, { "Content-Type": mime.getType(".txt") });
      res.end("child doesn't exist");
    });
}

module.exports = {
  timelineController,
};
