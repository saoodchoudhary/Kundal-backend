
const AddProductModel = require("../model/AddProductModel");
const SurveyModel = require("../model/SurveyModel");
const nodemailer = require("nodemailer");



const handleGetAllCategoryForSurvey = (req, res)=>{
        AddProductModel.find()
        .then((result)=>{       
              res.json(result);
        })
        .catch(()=>{
            res.json({ 
                success: false,
                 error: 'Failed to fetch category' 
           });
        })
       
}

const handleGetAllSurvey = (req, res)=>{
        SurveyModel.find()
        .then((result)=>{       
              res.json(result);
        })
        .catch(()=>{
            res.json({ 
                success: false,
                 error: 'Failed to fetch category' 
           });
        })
       
}
const handleGetSpecificSurvey =async (req, res)=>{
  const {id }= req.params;
  try {
    const data = await   SurveyModel.findById({_id:id});
     
     if(data)
     {
       res.json(data);

     }else{
      res.json("data not find")
     }
  } catch (error) {
    console.log(error)
    res.json("data not find")
    
  }
     
       
       
}

const handleAddSurvey = async (req, res)=>{
      console.log(req.body)
      const data = req.body;

      console.log(data.maxProduct)
  const adminTransport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "kundal.net.com@gmail.com",
        pass: "vtvvwiuqjmltqqgo"
      },
    });
   const adminMailOptions = await adminTransport.sendMail({
      from: {
        name: "Kundal FeedBack",
        address: "kundal.net.com@gmail.com"
      },
      to: [  "mohammad@aalzayed.com", "saloom99@windowslive.com"],
      subject: "New Survey Recieved",
      html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .feedback-details {
            border-collapse: collapse;
            width: 100%;
          }
          .feedback-details th, .feedback-details td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .feedback-details th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Hello, Kundal Team!</h1>
        <p>A new feedback has been submitted. Below are the details:</p>
          
        <h2>Feedback Details:</h2>
        <table class="feedback-details">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>${data.name}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>${data.age}</td>
            </tr>
            <tr>
              <td>Hair Kind:</td>
              <td>${data.hairKind}</td>
            </tr>
            <tr>
              <td>Max Product:</td>
              <td>${data.maxProduct}</td>
            </tr>
            <!-- Repeat for other keys -->
    
            
          </tbody>
        </table>
          
        <hr>
        
        <h2>Product 1:</h2>
        <p><strong>Product Name:</strong> ${data.productName1}</p>
        <p><strong>Personal Care Routine C:</strong> ${data.opinion1}</p>
        <p><strong>Pros:</strong> ${data.pros1}</p>
        <p><strong>Cons:</strong> ${data.cons1}</p>
        <p><strong>Previous Product:</strong> ${data.previousProduct_c1}</p>
        <p><strong>Purchase Information:</strong> ${data.purchaseInformation1}</p>
        <p><strong>Cost:</strong> ${data.cost1}</p>
        <p><strong>Comparison:</strong> ${data.comparisonSurvey1}</p>
        <p><strong>Ingredient Awarness:</strong> ${data.ingredientAwarness1}</p>
        <p><strong>Willingness to Pay:</strong> ${data.willingnesstoPay1}</p>
        <p><strong>HowMany Times to Pay:</strong> ${data.howManyTimes1}</p>
        <p><strong>Usage Information1</strong> ${data.usageInformation1}</p>
        <br/>
        <hr>
        ${ (data.maxProduct > 1) && 
        `<h2>Product 2:</h2>
        <p><strong>Product Name:</strong> ${data.productName2}</p>
        <p><strong>Personal Care Routine C:</strong> ${data.opinion2}</p>
        <p><strong>Pros:</strong> ${data.pros2}</p>
        <p><strong>Cons:</strong> ${data.cons2}</p>
        <p><strong>Previous Product:</strong> ${data.previousProduct_c2}</p>
        <p><strong>Purchase Information:</strong> ${data.purchaseInformation2}</p>
        <p><strong>Cost:</strong> ${data.cost2}</p>
        <p><strong>Comparison:</strong> ${data.comparisonSurvey2}</p>
        <p><strong>Ingredient Awarness:</strong> ${data.ingredientAwarness2}</p>
        <p><strong>Willingness to Pay:</strong> ${data.willingnesstoPay2}</p>
        <p><strong>HowMany Times to Pay:</strong> ${data.howManyTimes2}</p>
        <br/>
        <hr> `}

        ${ (data.maxProduct > 2) && 
        `<h2>Product 2:</h2>
        <p><strong>Product Name:</strong> ${data.productName3}</p>
        <p><strong>Personal Care Routine C:</strong> ${data.opinion3}</p>
        <p><strong>Pros:</strong> ${data.pros3}</p>
        <p><strong>Cons:</strong> ${data.cons3}</p>
        <p><strong>Previous Product:</strong> ${data.previousProduct_c3}</p>
        <p><strong>Purchase Information:</strong> ${data.purchaseInformation3}</p>
        <p><strong>Cost:</strong> ${data.cost3}</p>
        <p><strong>Comparison:</strong> ${data.comparisonSurvey3}</p>
        <p><strong>Ingredient Awarness:</strong> ${data.ingredientAwarness3}</p>
        <p><strong>Willingness to Pay:</strong> ${data.willingnesstoPay3}</p>
        <p><strong>HowMany Times to Pay:</strong> ${data.howManyTimes3}</p>
        <br/>
        <hr> `}
        
        <h2>Question 2:- </h2>
        <p><strong>Personal Care Routine A:</strong> ${data.personalCareRoutineA.join(', ')}</p>
        <p><strong>Personal Care Routine B:</strong> ${data.personalCareRoutineB}</p>
        <p><strong>Personal Care Routine C:</strong> ${data.personalCareRoutineC}</p>
    
        <!-- Continue adding sections for other keys -->
    
        <hr>
        
        <h2>Additional information Information:</h2>
        <p><strong>Allergies:</strong> ${data.allergies}</p>
        <p><strong>Extra Feedback:</strong> ${data.extraFeedback}</p>
      </body>
    </html>
      `
    }).then((r) => {
    }); 

        SurveyModel.create(req.body)
        .then((result)=>{      
             // for admin
 
              res.json(result);
        })
        .catch(()=>{
            res.json({ 
                success: false,
                 error: 'Failed to fetch category' 
           });
        })
       
}

module.exports = {
      handleGetAllCategoryForSurvey,
      handleAddSurvey,
      handleGetAllSurvey,
      handleGetSpecificSurvey
}