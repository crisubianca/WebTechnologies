const database = require('./database');

const http = require("http");
const url = require("url");
const controllers = require("./Controllers");
require("dotenv").config();

let pathRegex = /^\.\/public\/.+/;
const server = http.createServer((req, res) => {
    req.url = `.${req.url}`;
    console.log(url.parse(req.url, true).pathname);
    if (pathRegex.test(req.url)) {
        controllers.publicController(req, res);
    } else {
        switch (url.parse(req.url, true).pathname) {
            case "./":
                controllers.startPageController(req, res);
                break;
            case "./favicon.ico":
                req.url = "./public/images/logo.png";
                controllers.publicController(req, res);
                break;
            case "./logo.png":
                req.url = "./public/images/logo.png";
                controllers.publicController(req, res);
                break;
            case "./register":
                controllers.registerController(req, res);
                break;
            case "./registerUser":
                controllers.registerUserController(req, res);
                break;
            case "./login":
                controllers.loginController(req, res);
                break;
            case "./loginUser":
                controllers.loginUserController(req, res);
                break;
            case "./homePage":
                controllers.homePageController(req, res);
                break;
            case "./showProfiles":
                controllers.showProfilesController(req, res);
                break;
            case "./logout":
                controllers.logoutController(req, res);
                break;
            case "./deleteAccount":
                controllers.deleteAccountController(req, res);
                break;
            case "./fsSchedule":
                controllers.fsScheduleController(req, res);
                break;
            case "./medicalHistory":
                controllers.medicalHistoryController(req, res);
                break;
            case "./timeline":
                controllers.timelineController(req, res);
                break;
            case "./showMedicalHistory":
                controllers.showMedicalHistoryController(req, res);
                break;
            case "./showSchedule":
                controllers.showScheduleController(req, res);
                break;  
            default:
                console.log("ERR!!");
        }
    }
});



const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});