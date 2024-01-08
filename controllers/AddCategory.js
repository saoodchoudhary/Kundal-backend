

const AddCategoryModel = require('../model/AddCategory');
const path = require('path');
const fs = require('fs');


const handleAddCategory = (req,res)=>{
    
    AddCategoryModel.create({
       name:req.body.name, image: req.file.filename,
    })
    .then(()=>{
       res.json({
     sucess: true
    });
    })
    .catch((err)=>{
       res.json({
          success: false
       })
    })
 }
 
 const handleUpdateCategory = (req,res)=>{
    
    const {id} = req.params

    AddCategoryModel.findByIdAndUpdate(id,{name:req.body.name})
    .then(()=>{
       
          res.json({
            success: true,
            message: 'Category update successfully'
         });
    })
    .catch(()=>{
        res.json({ 
            success: false,
             error: 'Failed to update category' 
       });
    })
   
 }  

 const handleHideShowCategory = (req,res)=>{
    
    const {_id, status} = req.body
    let value = ""
    if (status === "show") {
       value = "hide"
 
    } else {
       value = "show"
    }

    AddCategoryModel.findByIdAndUpdate({_id:_id},{status:value})
    .then(()=>{
       
          res.json({
            success: true,
            message: 'Category update successfully'
         });
    })
    .catch(()=>{
        res.json({ 
            success: false,
             error: 'Failed to update category' 
       });
    })
   
 }  


 const handleDeleteCategory = (req,res)=>{
    
    const {id} = req.params

    AddCategoryModel.findByIdAndDelete(id)
    .then((result)=>{
       
          // Category successfully deleted
          const fileName = result.image;

          console.log(fileName)
          // Replace 'public/Images' with your actual image storage folder
          const filePath = path.join('public/Images', fileName);
 console.log(filePath)
          // Check if the file exists
          if (fs.existsSync(filePath)) {
 
             // Delete the file
             fs.unlinkSync(filePath);
 
             res.json({
                success: true,
                message: 'File deleted successfully'
             });
 
          } else {
             res.json({
                error: 'File not found',
                success: false
             });
          }
    })
    .catch(()=>{
        res.json({ 
            success: false,
             error: 'Failed to delete category' 
       });
    })
   
 } 

 const handleGetAllCategory = (req,res)=>{
    AddCategoryModel.find({status:"show"})
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
 const handleGetAdminCategory = (req,res)=>{
    AddCategoryModel.find()
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
 module.exports = { handleAddCategory , handleDeleteCategory, handleUpdateCategory,handleGetAllCategory,handleGetAdminCategory,handleHideShowCategory}