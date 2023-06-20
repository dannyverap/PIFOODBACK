const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db.js");


const getApiInfo = async () => {

    const response = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
    // https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100
    const recipeResponse = await response.data.results.map(({vegetarian, id, title, image, summary, healthScore, analyzedInstructions, diets }) => {
        
        if (vegetarian) diets.push("vegetarian")
       
        return {
            id,
            name:title,
            image,
            summary:summary.replace(/<[^>]+>/g, ""),
            healthScore,
            steps:analyzedInstructions.flatMap((instruction) => instruction.steps.map((step) => step.step)),
            diets,
            createdInDB:false,
        }
    })

    return recipeResponse;
}

const getDbInfo = async () => {
    const recipes = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
    const dbInfo = recipes.map((recipe) => {
        const { id, name, image, summary, healthScore, steps, Diets, createdInDB } = recipe;
        const diets = Diets.map(({ name }) => name);
        return {
            id,
            name,
            image,
            summary:summary.replace(/<[^>]+>/g, ""),
            healthScore,
            steps,
            diets,
            createdInDB,
        };
    });

    return dbInfo;
}

const getAllRecipes = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    if (apiInfo || dbInfo) return (apiInfo.concat(dbInfo))
    return{ error:`no se pudo obtener los datos`}
}

module.exports = 
    getAllRecipes;