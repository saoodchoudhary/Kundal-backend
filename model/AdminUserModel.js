const mongoose = require('mongoose')

const AdminUserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },
    password:{
        type: String,
        required: true, 
    },

},{timestamps: true})

const AdminUserModel = mongoose.model("adminUser",AdminUserSchema);

module.exports = AdminUserModel;