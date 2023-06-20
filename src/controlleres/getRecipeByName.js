const  getAllRecipes  = require("./getAllRecipes")



// require('dotenv').config();
// const { API_KEY } = process.env;

const getRecipeByName = async (name) => {

    const totalRecipes = await getAllRecipes()

    const Recipes = await totalRecipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()))

    if (Recipes) return Recipes;
    return { error: `No hay usuarios con nombre: ${name}` }; 
}

module.exports = getRecipeByName;