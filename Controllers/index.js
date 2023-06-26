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
const { showMedicalHistoryController } = require("./showMedicalHistory");
const { showScheduleController } = require("./showSchedule");
const { showTimelineController } = require("./showTimeline");
const { deleteChildProfileController } = require("./deleteChildProfile");

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
    showMedicalHistoryController,
    showScheduleController,
    showTimelineController,
    deleteChildProfileController,
};