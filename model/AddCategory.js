const mongoose = require("mongoose")

const AddCategoryShema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    status:{
        type:String,
        default:"show"
    }
})

const AddCategoryModel = mongoose.model("category",AddCategoryShema);
module.exports = AddCategoryModel