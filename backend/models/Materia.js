const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String,
        required: [true, "El código es obligatorio"],
        trim: true,
        unique: true 
    },
    nombre:{    
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [2, "El nombre es demasiado corto"],
        maxlength: [50, "Máximo 50 caracteres"],
        trim: true
    },
    descripcion:{
        type: String,
        validate: {
            validator: v => !v || v.trim() !== "",
            message: "La descripción no puede contener solo espacios"
        }   
    }, 
    cargaHoraria:{
        type: Number,
        required: [true, "La carga horaria es obligatoria"],
        min: [1, "La carga horaria debe ser mayor a 0"],
        validate: {
            validator: Number.isInteger,
            message: "La carga horaria debe ser un número entero"
        }
    },
    estado:{
        type: String,
        required: [true, "El estado es obligatorio"],
        enum: {
            values: ["activa", "inactiva"],
            message: "El estado solo puede ser activa o inactiva"
        }
    }
},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia