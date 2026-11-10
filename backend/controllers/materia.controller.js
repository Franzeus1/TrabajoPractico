const Materia = require("../models/Materia") 

async function obtenerMaterias(req, res) { 
    try {
        const materias = await Materia.find()
        res.json(materias) 
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error interno del servidor" })
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({ codigo: req.params.codigo })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        res.json(materia)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error interno del servidor" })
    }
}

async function crearMateria(req, res) {
    try {
        const { codigo, nombre, cargaHoraria, estado } = req.body
        let { descripcion } = req.body
        if (typeof descripcion === "string" && descripcion.trim() !== "") {
            descripcion = descripcion.trim()
        }
        const nuevo = await Materia.create({ codigo, nombre, descripcion, cargaHoraria, estado })
        res.status(201).json(nuevo)
    } catch (error) {
        if (error.name === "ValidationError") {
            const primero = Object.values(error.errors)[0]
            if (primero.name === "CastError") {
                return res.status(400).json({ mensaje: "Hay datos con formato inválido" })
            }
            return res.status(400).json({ mensaje: primero.message })
        }
        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "El código ya existe" })
        }
        console.error(error)
        res.status(500).json({ mensaje: "Error interno del servidor" })
    }
}

async function actualizarMateria(req, res) {
    try {
        const { codigo, nombre, cargaHoraria, estado } = req.body
        let { descripcion } = req.body
        if (typeof descripcion === "string" && descripcion.trim() !== "") {
            descripcion = descripcion.trim()
        }
        const materia = await Materia.findOneAndUpdate(
            { codigo: req.params.codigo },
            { codigo, nombre, descripcion, cargaHoraria, estado },
            { returnDocument: "after", runValidators: true }
        )
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        res.json(materia)
    } catch (error) {
        if (error.name === "ValidationError") {
            const primero = Object.values(error.errors)[0]
            if (primero.name === "CastError") {
                return res.status(400).json({ mensaje: "Hay datos con formato inválido" })
            }
            return res.status(400).json({ mensaje: primero.message })
        }
        if (error.name === "CastError") {
            return res.status(400).json({ mensaje: "Hay datos con formato inválido" })
        }
        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "El código ya existe" })
        }
        console.error(error)
        res.status(500).json({ mensaje: "Error interno del servidor" })
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({ codigo: req.params.codigo })
        if (!materia) {
            return res.status(404).json({ mensaje: "Materia no encontrada" })
        }
        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: "Error interno del servidor" })
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}