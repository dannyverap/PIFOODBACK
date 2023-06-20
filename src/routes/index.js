const router = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietRouter = require("./dietRouter")
const recipeRouter = require("./recipeRouter")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/diets",dietRouter)
router.use("/recipes",recipeRouter)

module.exports = router;
