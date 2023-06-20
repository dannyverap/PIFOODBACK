const axios = require("axios");
const { Diets } = require("../db.js");

require('dotenv').config();
const { API_KEY } = process.env;


const getAllDiets = async () => {

    const response = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
    //https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100

    //lo de abajo nos devuelve un array con las dietas que son un arrays:
    const dietResponse = response.data.results.map((recipe) => recipe.diets);

    dietResponse.push("vegetarian")

    //Con el flat hacemos que los elementos del array anidado lo incorporamos al mismo nivel
    //luego creamos un set para no tener elementos repetidos
    const dietSet = new Set(dietResponse.flat());

    //transformamos el set en un array
    const dietArray = Array.from(dietSet);

    //luego del array creado vamos a obtener los nombres de cada elemento
    //Despues insertamos los resultados en la base de dato

    for (const diet of dietArray) {
        await Diets.findOrCreate({ where: { name: diet } });
    }

    //finalmente obtendremos la información de la DB:
    const allDiets = await Diets.findAll();

    if (allDiets) return allDiets;
    return { error: `no se pudo obtener las dietas` }
}
module.exports = getAllDiets;