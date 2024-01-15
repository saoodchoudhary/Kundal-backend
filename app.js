const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const  cookieParser = require('cookie-parser')
const cors = require('cors');

const otherRouter = require('./routes/OtherRoutes')
const addProductRouter = require('./routes/AddProduct')
const addCategoryRouter = require('./routes/AddCategory')
const AdminUserRouter = require('./routes/AdminUser')
const SurveyRouter = require('./routes/SurveyRoutes')

const PORT = process.env.PORT || 8080;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://kundal.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If using credentials
    next();             
  });
  
  app.use(cors({
    credentials: true,
    origin: 'https://kundal.netlify.app'
  }));

app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDb connected")
    })
    .catch((err) => console.log(err))

app.use('/',otherRouter)
app.use('/',addProductRouter)
app.use('/', addCategoryRouter)
app.use('/', AdminUserRouter)
app.use('/survey', SurveyRouter)

app.get('/', (req, res) => {
    res.json({
        success: true,
        msg: "response successful"
    })
})

app.listen(PORT, () => {
    console.log("Server is Running on Port No. : " + PORT)
})