const express = require("express") 

const { 
    obtenerMaterias, 
    obtenerMateria, 
    crearMateria, 
    actualizarMateria, 
    eliminarMateria } = require("../controllers/materia.controller")
const router = express.Router() 

router.get("/", obtenerMaterias) 

router.get("/:codigo", obtenerMateria) 

router.post("/", crearMateria) 

router.put("/:codigo", actualizarMateria) 

router.delete("/:codigo", eliminarMateria) 

module.exports = router 