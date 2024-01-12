
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
      to: [ "docsinhindi@gmail.com, worldm957@gmail.com"],
      subject: "New Survey Recieved",
      html: `
      <html>
      <head>
        <style>
          /* Add your styles for the email here */
          /* Example style */
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
              <td>A. Pros:</td>
              <td>${data.a}</td>
            </tr>
            <tr>
              <td>B. Cons:</td>
              <td>${data.b}</td>
            </tr>
            <tr>
              <td>C. Previous Product:</td>
              <td>${data.c}</td>
            </tr>
            <tr>
              <td>D. Purchase Location:</td>
              <td>${data.d}</td>
            </tr>
            <tr>
              <td>E. Cost:</td>
              <td>${data.e}</td>
            </tr>
            <tr>
              <td>F. Better Replacement:</td>
              <td>${data.f}</td>
            </tr>
            <tr>
              <td>G. Read Ingredients:</td>
              <td>${data.g}</td>
            </tr>
            <tr>
              <td>H. Maximum Budget:</td>
              <td>${data.h}</td>
            </tr>
            <tr>
              <td>I. Usage Frequency:</td>
              <td>${data.i}</td>
            </tr>
            <tr>
              <td>J. Noticed Difference:</td>
              <td>${data.j}</td>
            </tr>
          </tbody>
        </table>
        
        <hr>
        
        <h2>Additional Information:</h2>
        <p><strong>Preference:</strong> ${data.preference}</p>
        <p><strong>Routine A:</strong> ${data.routine_a}</p>
        <p><strong>Routine B:</strong> ${data.routine_b}</p>
        <p><strong>Routine C:</strong> ${data.routine_c}</p>
        <p><strong>Allergies:</strong> ${data.allergies}</p>
        <p><strong>Extra Feedback:</strong> ${data.extraFeedback}</p>
        
        <hr>
        
        <h2>Contact Information:</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Contact:</strong> ${data.contact}</p>
        <p><strong>Email:</strong> ${data.email}</p>
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