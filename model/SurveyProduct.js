const mongoose = require('mongoose')

const productSurveySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    show:{
        type:String,
        default:'show'
    }

},{timestamps: true})

const ProductSurveyModel = mongoose.model("pSurvey",productSurveySchema);

module.exports = ProductSurveyModel;