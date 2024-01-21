
const AddProductModel = require("../model/AddProductModel");
const SurveyModel = require("../model/SurveyModel");
const nodemailer = require("nodemailer");
const ProductSurveyModel = require("../model/SurveyProduct");



const handleGetAllCategoryForSurvey = (req, res) => {
  AddProductModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.json({
        success: false,
        error: 'Failed to fetch category'
      });
    })

}

const handleGetAllSurvey = (req, res) => {
  SurveyModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.json({
        success: false,
        error: 'Failed to fetch category'
      });
    })

}
const handleGetSpecificSurvey = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await SurveyModel.findById({ _id: id });

    if (data) {
      res.json(data);

    } else {
      res.json("data not find")
    }
  } catch (error) {
    console.log(error)
    res.json("data not find")

  }

}
const handleDeleteSurvey = async (req, res) => {
  const { id } = req.params;
  SurveyModel.findByIdAndDelete({ _id: id })
    .then(() => {
      res.json({ "msg": "success" })
    })
    .catch((error) => {
      console.log(error)
    })
}


const handleAddSurvey = async (req, res) => {
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
  if(req.body.email !== ""){
    await adminTransport.sendMail({
      from: {
        name: "Kundal FeedBack",
        address: "kundal.net.com@gmail.com"
      },
      to: [ req.body.email],
      subject: "New Survey Recieved",
      html: `
<html lang="en">
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }

   

    .section-box {
      background-color: #fff;
      border: 1px solid #ddd;
      margin: 10px 0;
      padding: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li strong {
      display: block;
      margin-bottom: 5px;
    }
    li {
      background-color: #fbfdff;
      border-bottom: 1px solid #ddd;
      padding: 2px 5px;
    }

    h1, h2 {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div >
  <h1>Thank You for Submitting the Survey!</h1>
  <p>A new feedback has been submitted. Below are the details:</p>

    <!-- Basic Information Section -->
    <div class="section-box">
      <h2 class="text-lg font-bold mb-2">Basic Information:</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email :</strong> ${data.email}</li>
        <li><strong>Phone :</strong> ${data.phone}</li>
        <li><strong>Age :</strong> ${data.age}</li>
        <li><strong>Hair Kind :</strong> ${data.hairKind}</li>
        <li><strong>Max Product :</strong> ${data.maxProduct}</li>
      </ul>
    </div>

    

    <!-- Product 1 Information Section -->
    <div class="section-box">
      <h2 class="text-lg font-bold mb-2">Product 1 Information:</h2>
      <ul>
      <li><strong>Product Name:</strong> ${data.productName1}</li>
      <li><strong>Pros:</strong> ${data.pros1}</li>
      <li><strong>Cons:</strong> ${data.cons1}</li>
      <li><strong>What were you using before ${data.productName1}?</strong> ${data.previousProduct_c1}</li>
      <li><strong>Where did You Purchase it from?</strong> ${data.purchaseInformation1}</li>
      <li><strong>Price:</strong> ${data.cost1}</li>
      <li><strong>Is ${data.productName1} a better replacement for your current Product?</strong> ${data.comparisonSurvey1}</li>
      <li><strong>Have You read the ingredients of ${data.productName1}?</strong> ${data.ingredientAwarness1}</li>
      <li><strong>How much would you be willing to pay for ${data.productName1}?</strong> ${data.willingnesstoPay1}</li>
      <li><strong>How many times you used ${data.productName1} since you received it?</strong> ${data.howManyTimes1}</li>
      <li><strong>Have you seen a difference after using ${data.productName1} to your hair or skin?</strong> ${data.usageInformation1}</li>
      </ul>
    </div>

    ${(data.maxProduct > 1) && ` <div class="section-box">
      <h2 class="text-lg font-bold mb-2">Product 2 Information:</h2>
      <ul>
      <li><strong>Product Name:</strong> ${data.productName2}</li>
      <li><strong>Pros:</strong> ${data.pros2}</li>
      <li><strong>Cons:</strong> ${data.cons2}</li>
      <li><strong>What were you using before ${data.productName2}?</strong> ${data.previousProduct_c2}</li>
      <li><strong>Where did You Purchase it from?</strong> ${data.purchaseInformation2}</li>
      <li><strong>Price:</strong> ${data.cost2}</li>
      <li><strong>Is ${data.productName2} a better replacement for your current Product?</strong> ${data.comparisonSurvey2}</li>
      <li><strong>Have You read the ingredients of ${data.productName2}?</strong> ${data.ingredientAwarness2}</li>
      <li><strong>How much would you be willing to pay for ${data.productName2}?</strong> ${data.willingnesstoPay2}</li>
      <li><strong>How many times you used ${data.productName2} since you received it?</strong> ${data.howManyTimes2}</li>
      </ul>
    </div>`}

  
${(data.maxProduct > 2) && 
  ` <div class="section-box">
      <h2 class="text-lg font-bold mb-2">Product 3 Information:</h2>
      <ul>
      <li><strong>Product Name:</strong> ${data.productName3}</li>
      <li><strong>Pros:</strong> ${data.pros3}</li>
      <li><strong>Cons:</strong> ${data.cons3}</li>
      <li><strong>What were you using before ${data.productName3}?</strong> ${data.previousProduct_c3}</li>
      <li><strong>Where did You Purchase it from?</strong> ${data.purchaseInformation3}</li>
      <li><strong>Price:</strong> ${data.cost3}</li>
      <li><strong>Is ${data.productName3} a better replacement for your current Product?</strong> ${data.comparisonSurvey3}</li>
      <li><strong>Have You read the ingredients of ${data.productName3}?</strong> ${data.ingredientAwarness3}</li>
      <li><strong>How much would you be willing to pay for ${data.productName3}?</strong> ${data.willingnesstoPay3}</li>
      <li><strong>How many times you used ${data.productName3} since you received it?</strong> ${data.howManyTimes3}</li>
      </ul>
    </div>`
}

    <div class="section-box">
      <h2 class="text-lg font-bold mb-2">Personal Care Routine :-</h2>
      <ul>
      <li><strong>What is your personal care routine:</strong> ${data.personalCareRoutineA}</li>
      <li><strong>From where do you buy your personal care products:</strong> ${data.personalCareRoutineB}</li>
      <li><strong>What is your hair care routine:</strong> ${data.personalCareRoutineC}</li>
      </ul>
    </div>

    <!-- Q1: Product Preference Section -->
    <div class="section-box">
      <h2 class="text-lg font-bold mb-2"> Product Preference :</h2>
      <ul>
      <li><strong>Product Preference?</strong> ${data.q2}</li>
      </ul>
    </div>
    <div class="section-box">
      <h2 class="text-lg font-bold mb-2">Additional information Information :-</h2>
      <ul>
        <li><strong>Allergies:</strong> ${data.allergies}</li>
        <li><strong>Extra Feedback:</strong> ${data.extraFeedback}</li>
      </ul>
    </div>


  </div>
</body>
</html>

    `
    }).then((r) => {
    });

  }

  // for admin
  const adminMailOptions = await adminTransport.sendMail({
    from: {
      name: "Kundal FeedBack",
      address: "kundal.net.com@gmail.com"
    },
    to: [  "mohammad@aalzayed.com", "saloom99@windowslive.com"],
    subject: "New Survey Recieved",
    html: `
    <html lang="en">
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
        }
    
       
    
        .section-box {
          background-color: #fff;
          border: 1px solid #ddd;
          margin: 10px 0;
          padding: 10px;
        }
    
        ul {
          list-style: none;
          padding: 0;
        }
    
        li strong {
          display: block;
          margin-bottom: 5px;
        }
        li {
          background-color: #fbfdff;
          border-bottom: 1px solid #ddd;
          padding: 2px 5px;
        }
    
        h1, h2 {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div >
      <h1>Hello Kundal Team!</h1>
      <p>A new feedback has been submitted. Below are the details:</p>
    
        <!-- Basic Information Section -->
        <div class="section-box">
          <h2 class="text-lg font-bold mb-2">Basic Information:</h2>
          <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email :</strong> ${data.email}</li>
            <li><strong>Phone :</strong> ${data.phone}</li>
            <li><strong>Age :</strong> ${data.age}</li>
            <li><strong>Hair Kind :</strong> ${data.hairKind}</li>
            <li><strong>Max Product :</strong> ${data.maxProduct}</li>
          </ul>
        </div>
    
        
    
        <!-- Product 1 Information Section -->
        <div class="section-box">
          <h2 class="text-lg font-bold mb-2">Product 1 Information:</h2>
          <ul>
          <li><strong>Product Name:</strong> ${data.productName1}</li>
          <li><strong>Pros:</strong> ${data.pros1}</li>
          <li><strong>Cons:</strong> ${data.cons1}</li>
          <li><strong>What were you using before ${data.productName1}?</strong> ${data.previousProduct_c1}</li>
          <li><strong>Where did You Purchase it from?</strong> ${data.purchaseInformation1}</li>
          <li><strong>Price:</strong> ${data.cost1}</li>
          <li><strong>Is ${data.productName1} a better replacement for your current Product?</strong> ${data.comparisonSurvey1}</li>
          <li><strong>Have You read the ingredients of ${data.productName1}?</strong> ${data.ingredientAwarness1}</li>
          <li><strong>How much would you be willing to pay for ${data.productName1}?</strong> ${data.willingnesstoPay1}</li>
          <li><strong>How many times you used ${data.productName1} since you received it?</strong> ${data.howManyTimes1}</li>
          <li><strong>Have you seen a difference after using ${data.productName1} to your hair or skin?</strong> ${data.usageInformation1}</li>
          </ul>
        </div>
    
        ${(data.maxProduct > 1) && ` <div class="section-box">
          <h2 class="text-lg font-bold mb-2">Product 2 Information:</h2>
          <ul>
          <li><strong>Product Name:</strong> ${data.productName2}</li>
          <li><strong>Pros:</strong> ${data.pros2}</li>
          <li><strong>Cons:</strong> ${data.cons2}</li>
          <li><strong>What were you using before ${data.productName2}?</strong> ${data.previousProduct_c2}</li>
          <li><strong>Where did You Purchase it from?</strong> ${data.purchaseInformation2}</li>
          <li><strong>Price:</strong> ${data.cost2}</li>
          <li><strong>Is ${data.productName2} a better replacement for your current Product?</strong> ${data.comparisonSurvey2}</li>
          <li><strong>Have You read the ingredients of ${data.productName2}?</strong> ${data.ingredientAwarness2}</li>
          <li><strong>How much would you be willing to pay for ${data.productName2}?</strong> ${data.willingnesstoPay2}</li>
          <li><strong>How many times you used ${data.productName2} since you received it?</strong> ${data.howManyTimes2}</li>
          </ul>
        </div>`}
    
      
    ${(data.maxProduct > 2) && 
      ` <div class="section-box">
          <h2 class="text-lg font-bold mb-2">Product 3 Information:</h2>
          <ul>
          <li><strong>Product Name:</strong> ${data.productName3}</li>
          <li><strong>Pros:</strong> ${data.pros3}</li>
          <li><strong>Cons:</strong> ${data.cons3}</li>
          <li><strong>What were you using before ${data.productName3}?</strong> ${data.previousProduct_c3}</li>
          <li><strong>Where did You Purchase it from?</strong> ${data.purchaseInformation3}</li>
          <li><strong>Price:</strong> ${data.cost3}</li>
          <li><strong>Is ${data.productName3} a better replacement for your current Product?</strong> ${data.comparisonSurvey3}</li>
          <li><strong>Have You read the ingredients of ${data.productName3}?</strong> ${data.ingredientAwarness3}</li>
          <li><strong>How much would you be willing to pay for ${data.productName3}?</strong> ${data.willingnesstoPay3}</li>
          <li><strong>How many times you used ${data.productName3} since you received it?</strong> ${data.howManyTimes3}</li>
          </ul>
        </div>`
    }
    
        <div class="section-box">
          <h2 class="text-lg font-bold mb-2">Personal Care Routine :-</h2>
          <ul>
          <li><strong>What is your personal care routine:</strong> ${data.personalCareRoutineA}</li>
          <li><strong>From where do you buy your personal care products:</strong> ${data.personalCareRoutineB}</li>
          <li><strong>What is your hair care routine:</strong> ${data.personalCareRoutineC}</li>
          </ul>
        </div>
    
        <!-- Q1: Product Preference Section -->
        <div class="section-box">
          <h2 class="text-lg font-bold mb-2"> Product Preference :</h2>
          <ul>
          <li><strong>Product Preference?</strong> ${data.q2}</li>
          </ul>
        </div>
        <div class="section-box">
          <h2 class="text-lg font-bold mb-2">Additional information Information :-</h2>
          <ul>
            <li><strong>Allergies:</strong> ${data.allergies}</li>
            <li><strong>Extra Feedback:</strong> ${data.extraFeedback}</li>
          </ul>
        </div>
    
    
      </div>
    </body>
    </html>
  `
  }).then((r) => {
  });

  SurveyModel.create(req.body)
    .then((result) => {
      // for admin

      res.json(result);
    })
    .catch(() => {
      res.json({
        success: false,
        error: 'Failed to fetch category'
      });
    })
}

const handleAdminAddProductSurvey = async (req, res) => {
  console.log(req.body)
  ProductSurveyModel.create(req.body)
    .then(() => {
      res.json({ "msg": "success" })
    })
    .catch((error) => {
      console.log(error)
    })
}
const handleGetAllProductSurvey = async (req, res) => {
  const data = await ProductSurveyModel.find({ "show": "show" })
  res.json(data)
}

const handleGetAllAdminProductSurvey = async (req, res) => {
  const data = await ProductSurveyModel.find()
  res.json(data)
}
const handleGetAllSpecificProductAdminSurvey = async (req, res) => {
  const {id} =req.params
  const p1 = await SurveyModel.find({productName1: id});
  const p2 = await SurveyModel.find({productName2: id});
  const p3 = await SurveyModel.find({productName3: id});
  const data =[...p1, ...p2, ...p3]
  res.json(data)
}

const handleDeleteSurveyProduct = async (req, res) => {
  const { id } = req.params;
  ProductSurveyModel.findByIdAndDelete({ _id: id })
    .then((re) => {
      res.json({ "msg": "success" })
    })
    .catch((error) => {
      console.log(error)
    })
}

const handleHideShowSurveyProduct = async (req, res) => {

  const { _id, show } = req.body
  let value = ""
  if (show === "show") {
    value = "hide"
  } else {
    value = "show"
  }
  ProductSurveyModel.findByIdAndUpdate({ _id: _id }, { "show": value })
    .then((re) => {
      res.json(re)
    })
    .catch((error) => {
      console.log(error)
      res.json({
        success: false
      })
    })
}

module.exports = {
  handleGetAllCategoryForSurvey,
  handleAddSurvey,
  handleGetAllSurvey,
  handleGetSpecificSurvey,
  handleDeleteSurvey,
  handleAdminAddProductSurvey,
  handleGetAllProductSurvey,
  handleDeleteSurveyProduct,
  handleGetAllAdminProductSurvey,
  handleHideShowSurveyProduct,
  handleGetAllSpecificProductAdminSurvey
}