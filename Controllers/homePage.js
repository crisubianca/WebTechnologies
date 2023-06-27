const { viewHomePage } = require("../views/templates");
const { auth } = require("../utils");
const { getPostData } = require("../utils");
const childRepository = require("../Models/childRepository");
const userRepository = require("../Models/userRepository");
const mime = require("mime");

async function homePageController(req, res) {
  let user = auth(req, res);
  if (!user) {
    console.log("user is not authorized");
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end("Unauthorized", "utf8");
  } else {
    switch (req.method) {
      case "GET":
        res.end(viewHomePage, "utf8");
        break;
      case "POST":
        homePage(req, res);
        break;
      default:
        res.writeHead(405);
        res.end();
    }
  }
}

async function homePage(req, res) {
  let user = auth(req, res);
  try {
    const user_id = await userRepository
      .returnIdByUsername(user.username)
      .then((parentId) => {
        return parentId;
      });

    const body = await getPostData(req);
    const { firstname, surname, gender, birthdate } = body;
    const child = {
      firstname,
      surname,
      birthdate,
      gender,
      user_id,
    };
    childRepository
      .create(child)
      .then((childData) => {
        console.log("ChildData", childData);
      })
      .catch((err) => {
        console.log(err);
        res.writeHead(401, { "Content-Type": mime.getType(".txt") });
        res.end("user doesn't exist");
      });
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  homePageController,
};
