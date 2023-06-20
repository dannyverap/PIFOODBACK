const axios = require("axios");
const { Recipe, Diets } = require("../db.js");

require('dotenv').config();
const { API_KEY } = process.env;

const getRecipeById = async (id) => {

    const idOrigin = isNaN(id) ? 'bd' : 'api'

    if (idOrigin === "api") {
        const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
        // https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true
        const { title, image, summary, healthScore, analyzedInstructions,diets } = recipesApi.data
        const steps = analyzedInstructions.flatMap((instruction) => instruction.steps.map((step) => step.step))

        return {
            id,
            name:title,
            image,
            summary:summary.replace(/<[^>]+>/g, ""),
            healthScore,
            steps: steps,
            diets,
            createdInDB:false,
        }
    }

    const recipeDB = await Recipe.findByPk(id, {
        include: [
            {
                model: Diets,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    
    
    if (!recipeDB) {
        return { error: "Receta no encontrada en la base de datos" };
    }
    
    const { name, image, summary, healthScore, steps,createdInDB} = recipeDB;
    
    
    const dietNames = recipeDB.Diets.map((diet) => diet.name); // Obtener un array de los nombres de las dietas
    
    return {
        id,
        name,
        image,
        summary,
        healthScore,
        steps,
        diets: dietNames,
        createdInDB,
    };
}

module.exports = getRecipeById;