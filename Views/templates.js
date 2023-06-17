const path = require('path');
const fs = require('fs');

function getView(url) {
    return fs.readFileSync(path.join(__dirname, url))
}

let viewIndex = getView('./index.html');
let viewLogin = getView('./login.html');
let viewSignUp = getView('./signup.html');
let viewHomePage = getView('./homePage.html');
let viewInfo = getView('./info.html');
let viewSchedule = getView('./fsSchedule.html');
let viewMedicalHistory = getView('./medicalHistory.html');
let viewTimeline = getView('./timeline.html');

module.exports = {
    viewIndex, viewLogin, viewSignUp, viewHomePage,
    viewInfo, viewSchedule, viewMedicalHistory,
    viewTimeline
}