const dietRouter = require("express").Router();

const {dietHandler} = require("../handler/dietHandler");

dietRouter.get("/",dietHandler)

module.exports = dietRouter;