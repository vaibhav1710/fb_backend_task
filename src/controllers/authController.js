const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {createNewAdmin, loginAdminService} = require('../services/authServices');
const prisma = new PrismaClient();

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email format validation
    return emailRegex.test(email);
  };
  
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;  // Ensures 10 digits
    return phoneRegex.test(phoneNumber);
  };

const renderRegisterPage = (req, res) => {
    res.render('register',{error:null});
};

const registerAdmin = async (req,res) => {
    const {name, email, phoneNumber} = req.body;
    
    if(!validateEmail(email)){
        res.render('register' , {error: 'check email format'})
    }
    if(!validatePhoneNumber(phoneNumber)){
        res.render('register' , {error: 'check phoneNumber'})
    }

    try{
         const {newAdmin,token}  = await createNewAdmin(name, email, phoneNumber);
         console.log(token);
         res.cookie('token', token, {httpOnly:true});
         res.redirect('feed');

    }catch(error){
         res.render('register', {error:'Error registering Admin'})
    }
}

async function renderForm(req, res) {
    const {adminId} = req.params;
    const admin = await prisma.user.findUnique({ where: { id: Number(adminId) } });
    res.render('form', {admin});
}

async function renderLoginAdminPage(req,res){
    res.render('login',  {error:null});

}


async function loginAdmin(req,res) {
    const {email, phoneNumber} = req.body;
    console.log(email,' ',phoneNumber);
    
    try{
       const response =  await loginAdminService(email,phoneNumber);
       if(response.success){
       res.cookie('token',response.token,{httpOnly:true});
       res.redirect('feed');
       }else{
        res.render('login',{error:'Not an admin'});
       }
       
    }catch(error){

    }
}

async function handleLogout(req,res){
    res.clearCookie('token');
    res.redirect('feed');
   } 



module.exports ={
    renderRegisterPage,
    registerAdmin,
    renderForm,
    renderLoginAdminPage,
    loginAdmin,
    handleLogout
}