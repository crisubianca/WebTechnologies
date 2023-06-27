const { auth } = require('../utils');
const mime = require("mime");
const medicalHistoryRepository = require("../Models/medicalHistoryRepository");
require("dotenv").config();

function deleteMedicalHistoryEntryController(req, res) {
    let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "DELETE":
        deleteMedicalHistoryEntry(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

function deleteMedicalHistoryEntry(req, res) {
    const id = req.url.split("=")[1];

   try {
    medicalHistoryRepository
    .deleteById(id)
    .catch((err) => {
        console.log(err);
        res.writeHead(401, { "Content-Type": mime.getType(".txt") });
        res.end("id doesn't exist");
    })
   }catch (error) {
    console.log(error);
   }
}

module.exports = {
    deleteMedicalHistoryEntryController
}
