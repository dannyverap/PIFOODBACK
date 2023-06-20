const { Recipe, Diets } = require("../db.js");

const postRecipe = async (name, image, summary, healthScore, steps, diets) => {
    const newRecipe = await Recipe.create({name, image, summary, healthScore, steps })

    const dietDB = await Diets.findAll({
        where: {
          name: diets
        }
      });
    
      await newRecipe.addDiets(dietDB);
    
      return newRecipe;
    };
module.exports = postRecipe;

