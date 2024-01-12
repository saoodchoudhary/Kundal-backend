const mongoose = require('mongoose')

// A. Pros:
// B. Cons:
// C. What were you using before Kundal?
// D. Where did you purchase it?
// E. Cost:
// F. Is Kundal a better replacement for your current product?
// G. Have you read the ingredients of Kundal products? (Optional: Yes or No)
// H. How much would you be willing to pay for Kundal?
// I. How many times have you used Kundal products since you received them?
// J.have you seen a difference after using our Kundal hair/skin products?
const SurveySchema = new mongoose.Schema({
    productName:{
        type:String
    },
    a:{
        type: String,
        
    },
    b:{
        type: String,
        
    },
    c:{
        type: String,
        
    },
    d:{
        type: String,
        
    },
    e:{
        type: String,
        
    },
    f:{
        type: String,
        
    },
    g:{
        type: String,
        
    },
    h:{
        type: String,
        
    },
    i:{
        type: String,
        
    },
    j:{
        type: String,
        
    },
    preference:{
        type: String,
    },
    routine_a:{
        type: String,
    },
    routine_b:{
        type: String,
    },
    routine_c:{
        type: String,
    },
    allergies:{
        type: String,
    },
    additional:{
        type: String,
    },
    extraFeedback:{
        type: String,
    },
    name:{
        type: String,
    },
    contact:{
        type: String,
    },
    email:{
        type: String,
    },
    read:{
        type: String,
        default:"no"
    },
    

},{timestamps: true})

const SurveyModel = mongoose.model("survey",SurveySchema);

module.exports = SurveyModel;