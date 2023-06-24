const { publicController } = require("./public");
const { startPageController } = require("./startPage");
const { registerController } = require("./register");
const { registerUserController } = require("./registerUser");
const { loginController } = require("./login");
const { loginUserController } = require("./loginUser");
const { homePageController } = require("./homePage");
const { logoutController } = require("./logout");
const { deleteAccountController } = require("./deleteAccount");
const { showProfilesController } = require("./showProfiles");
const { fsScheduleController } = require("./fsSchedule");
const { medicalHistoryController } = require("./medicalHistory"); 
const { timelineController } = require("./timeline");

module.exports = {
    startPageController,
    loginController,
    loginUserController,
    publicController,
    registerController,
    registerUserController,
    homePageController,
    logoutController,
    deleteAccountController,
    showProfilesController,
    fsScheduleController,
    medicalHistoryController,
    timelineController,
};