const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
name:{
    type: String,
    required: true
},
contractType:{
    type: String,
    required: true
},
employDate:{
    type: Date,
    required: true,
    default: Date.now
}

});

module.exports = mongoose.model("Employees", employeeSchema);