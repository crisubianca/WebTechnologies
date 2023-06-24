const { viewMedicalHistory } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const medicalHistoryRepository = require("../Models/medicalHistoryRepository");
const userRepository = require("../Models/userRepository");
const bcrypt = require("bcrypt");
const mime = require("mime");
const jwt = require("jsonwebtoken");

async function medicalHistoryController(req, res) {
  let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "GET":
        res.end(viewMedicalHistory, "utf8");
        break;
      case "POST":
        medicalHistory(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

async function medicalHistory(req, res) {
  const body = await getPostData(req);
  const { child_id, age, date, weight, height, procedure, note } = body;
  const entry = {
    child_id,
    age,
    date,
    weight,
    height,
    procedure,
    note,
  };

  medicalHistoryRepository
    .create(entry)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
        res.writeHead(401, { "Content-Type": mime.getType(".txt") });
        res.end("child doesn't exist");
    })
}
module.exports = {
  medicalHistoryController,
};
