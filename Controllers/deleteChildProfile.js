const { auth } = require('../utils');
const mime = require("mime");
const childRepository = require("../Models/childRepository");
require("dotenv").config();

function deleteChildProfileController(req, res) {
    let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "DELETE":
        deleteChildProfile(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

function deleteChildProfile(req, res) {
    const childId = req.url.split("=")[1];
    console.log("delete childId", childId);

   try {
    childRepository
    .deleteById(childId)
    .catch((err) => {
        console.log(err);
        res.writeHead(401, { "Content-Type": mime.getType(".txt") });
        res.end("child_id doesn't exist");
    })
   }catch (error) {
    console.log(error);
   }
}

module.exports = {
    deleteChildProfileController
}
