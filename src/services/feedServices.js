// services/feedService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllAdmins = async () => {
  try {
    // Fetch admins from the database
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: {
        name: true,
        qrCode: true,
        id:true,
        email:true
      }
    });
    return admins;
  } catch (error) {
    throw new Error('Error fetching admins: ' + error.message);
  }
};


async function getAllVisitors(adminId) {
  
  try{
    const myVisitors = await prisma.visitorAdminLink.findMany({
      where: {
          adminId: parseInt(adminId), // Make sure to parse adminId to an integer
      },
      include: {
          visitor: { // Include visitor details
              select: {
                  id: true,
                  name: true,
                  email: true,
                  phoneNumber: true,
                  createdAt: true,
              },
          },
      },
  });
   
  return myVisitors;

  }catch(error){
    throw new Error('Error fetching visitors: ' + error.message); 
  }
}

module.exports = { getAllAdmins, getAllVisitors};
