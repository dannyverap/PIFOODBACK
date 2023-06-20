const recipeRouter = require("express").Router();

const { getAllRecipeHandler,
    getRecipeByIDHandler,
    getRecipeByNameHandler,
    postRecipeHandler,
    deleteRecipeByIdHandler } = require("../handler/recipeHandler");

recipeRouter.get("/getall", getAllRecipeHandler)
recipeRouter.get("/:id", getRecipeByIDHandler)
recipeRouter.get("/", getRecipeByNameHandler)
recipeRouter.post("/", postRecipeHandler)
recipeRouter.delete("/:id", deleteRecipeByIdHandler)


module.exports = recipeRouter;