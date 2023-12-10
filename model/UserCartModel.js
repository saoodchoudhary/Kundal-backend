const mongoose = require('mongoose')

const UserCartSchema = mongoose.Schema({
    owner:{
        type: String,
        required: true
    },
    product:{
        type: String,
        required: true
    }
    
})

