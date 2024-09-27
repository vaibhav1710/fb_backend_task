// controllers/feedController.js
const { getAllAdmins, getAllVisitors } = require('../services/feedServices');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFeedPage = async (req, res) => {
  try {
    // Fetch all admins using the service
    const admins = await getAllAdmins();
    const token = req.cookies.token;
    //console.log(token);
    // Render the feed page and pass the admins data
    res.render('feed', { admins, error:null, token});
  } catch (error) {
    // Handle any errors and return a 500 status
    res.render('feed', {admin:[] ,error:'Error loading QR Codes'});
  }
};


const getVisitors = async(req,res) => {
   
  const {adminId} = req.params;
  
  try{
    
    const admin = await prisma.user.findUnique({
      where : {id: Number(adminId)},
      select : {
       name: true
      }
    })
    let visitors;
    
    if(admin){
     visitors = await getAllVisitors(adminId);
    }  
    
    res.render('dashboard', { visitors , admin, error:null });

  }catch(error){
    res.render('dashboard', {visitors:[], admin:null, error: 'Error showing visitors'})
  }


}

module.exports = { getFeedPage , getVisitors };
