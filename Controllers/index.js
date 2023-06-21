const { publicController } = require("./public");
const { registerController } = require("./register");
const { registerUserController } = require("./registerUser");
const { loginController } = require("./login");
const { loginUserController } = require("./loginUser");

module.exports = {
    loginController,
    loginUserController,
    publicController,
    registerController,
    registerUserController
};