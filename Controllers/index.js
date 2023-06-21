const { publicController } = require("./public");
const { registerController } = require("./register");
const { registerUserController } = require("./registerUser");

module.exports = {
    publicController,
    registerController,
    registerUserController
};