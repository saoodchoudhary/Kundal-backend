const AdminUserModel = require("../model/AdminUserModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_PASS = "STORE_PASS_qwertyuiopasdfghjklzxvbnm_Admin_pass";

const handleCreateAdminUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await AdminUserModel.findOne({ email })
    if (existUser) {
        res.json({
            success: false,
            msg: "User already Exists"
        })
    } else {
        const hashPassword = await bcrypt.hash(password, 10)

        AdminUserModel.create({
            name: name,
            email: email,
            password: hashPassword
        })
            .then((result) => {
                res.status(400).json({
                    success: true,
                    msg: "user are created"
                })
            })
            .catch(() => {
                res.json({
                    success: false,
                    msg: "user not created"
                })
            })
    }

}

const handleDeleteAdminUser = (req, res) => {
    const { id } = req.params
    AdminUserModel.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                success: true,
                msg: 'User are Deleted'
            })
        })
        .catch((err) => {
            res.json({
                success: false,
                msg: "User Not Deleted"
            })
        })
}

const handleGetAllAdminUser = async (req, res) => {
    
   const getAllAdmin = await AdminUserModel.find({})
       res.json(getAllAdmin)
}


const handleLoginAdmin = (req, res)=>{
    const {email, password} =req.body;
    AdminUserModel.findOne({email:email})
    .then((user)=>{
        if(!user){
            res.json({
                success:false,
                msg:"user not exists"
            })
        }else{
            bcrypt.compare(password, user.password, (err,result)=>{
                if(err || !result)
                {
                    res.json({
                        success:false,
                        msg:"Invalid Password"
                    })
                }else{
                    const token = jwt.sign({
                         email : user.email,
                         password: user.password
                      }, SECRET_PASS );
                      

                      res.json({
                        success:true,
                        token: token,
                        msg: "login successful"

                      })
                }
            })
        }
    })
}
module.exports = { handleCreateAdminUser, handleDeleteAdminUser, handleLoginAdmin,handleGetAllAdminUser }