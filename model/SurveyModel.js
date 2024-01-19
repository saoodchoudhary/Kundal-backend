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
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type: String,
        
    },
    q2:{
        type:String,
    },
    hairKind:{
        type: String,
        
    },
    maxProduct:{
        type: String,
        
    },
    productName1:{
        type: String,
        
    },
    productName2:{
        type: String,
        
    },
    productName3:{
        type: String,
        
    },
    pros1:{
        type: String,
        
    },
    pros2:{
        type: String,
        
    },
    pros3:{
        type: String,
        
    },
    cons1:{
        type: String,
        
    },
    cons2:{
        type: String,
        
    },
    cons3:{
        type: String,
        
    },
    previousProduct_c1:{
        type: String,
        
    },
    previousProduct_c2:{
        type: String,
        
    },
    previousProduct_c3:{
        type: String, 
    },

    purchaseInformation1:{
        type: String, 
    },

    purchaseInformation2:{
        type: String, 
    },

    purchaseInformation3:{
        type: String, 
    },

    cost1:{
        type: String, 
    },

    cost2:{
        type: String, 
    },

    cost3:{
        type: String, 
    },

    comparisonSurvey1:{
        type: String, 
    },

    comparisonSurvey2:{
        type: String, 
    },

    comparisonSurvey3:{
        type: String, 
    },

    ingredientAwarness1:{
        type: String, 
    },


    ingredientAwarness2:{
        type: String, 
    },


    ingredientAwarness3:{
        type: String, 
    },

    willingnesstoPay1:{
        type: String, 
    },

    willingnesstoPay2:{
        type: String, 
    },

    willingnesstoPay3:{
        type: String, 
    },

    howManyTimes1:{
        type: String, 
    },

    howManyTimes2:{
        type: String, 
    },

    howManyTimes3:{
        type: String, 
    },

    usageInformation1:{
        type: String,        
    },

    personalCareRoutineA:{
        type: String,       
    },

    personalCareRoutineB:{
        type: String,
    },

    personalCareRoutineC:{
        type: String,
    },

    allergies:{
        type: String,
    },
    extraFeedback:{
        type: String,
    },    

},{timestamps: true})

const SurveyModel = mongoose.model("survey",SurveySchema);

module.exports = SurveyModel;