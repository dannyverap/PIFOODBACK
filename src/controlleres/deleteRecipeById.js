const { Recipe } = require("../db");

const deleteRecipeById = async (id) => {
    const recipeFound = await Recipe.findByPk(id);

    if (!recipeFound) {
        return { error: "No existe receta con ese ID" };
    }

    await Recipe.destroy({ where: { id } });

    return "Receta borrada exitosamente";
};

module.exports = deleteRecipeById;
