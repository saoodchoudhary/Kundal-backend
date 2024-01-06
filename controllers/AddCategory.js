

const AddCategoryModel = require('../model/AddCategory');

const handleAddCategory = (req,res)=>{
    
    AddCategoryModel.create({
       name:req.body.name,
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
    .then(()=>{
       
          // Category successfully deleted
          res.json({
            success: true,
            message: 'Category delete successfully'
         });
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