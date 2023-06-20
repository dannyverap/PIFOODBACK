const getRecipeById = require("../controlleres/getRecipeByID")
const getRecipeByName = require("../controlleres/getRecipeByName")
const postRecipe = require("../controlleres/postRecipe")
const getAllRecipes = require("../controlleres/getAllRecipes");
const deleteRecipeById = require("../controlleres/deleteRecipeID");

const getAllRecipeHandler = async (req, res) => {
    try {
        const response = await getAllRecipes();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getRecipeByIDHandler = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getRecipeById(id);
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const getRecipeByNameHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const response = await getRecipeByName(name);
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const postRecipeHandler = async (req, res) => {
    const { name, image, summary, healthScore, steps, diets } = req.body
    try {
        if (!name || !image || !summary || !healthScore || !steps || !steps) throw Error("Completar la información")

        await postRecipe(name, image, summary, healthScore, steps, diets)
        res.status(200).json("Agregado con exito!")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteRecipeByIdHandler = async (req, res) => {
    try {
        const { id } = req.params
        const response = await deleteRecipeById(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getRecipeByIDHandler,
    getRecipeByNameHandler,
    postRecipeHandler,
    getAllRecipeHandler,
    deleteRecipeByIdHandler,
}