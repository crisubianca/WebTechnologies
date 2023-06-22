const { publicController } = require("./public");
const { startPageController } = require("./startPage");
const { registerController } = require("./register");
const { registerUserController } = require("./registerUser");
const { loginController } = require("./login");
const { loginUserController } = require("./loginUser");

module.exports = {
    startPageController,
    loginController,
    loginUserController,
    publicController,
    registerController,
    registerUserController
};