const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function createNewAdmin(name, email, phoneNumber) {
    
    try{
         
        const existingUser = await prisma.user.findUnique({
          where: {
            email_phoneNumber: {
              email: email,
              phoneNumber: phoneNumber,
            },
          }
          });
      
          if (existingUser) {
            throw new Error('Email or phone number already in use');
          }

          const newAdmin = await prisma.user.create({
            data: {
              name,
              email,
              phoneNumber,
              role: 'admin',
              qrCode: ''  // Placeholder for QR code to be added later
            }
          });
      
          // Generate QR code
          const qrCodeUrl = await QRCode.toDataURL(`${process.env.URL}/form/${newAdmin.id}`);
      
          // Update the admin with the generated QR code
          await prisma.user.update({
            where: { id: newAdmin.id },
            data: { qrCode: qrCodeUrl }
          });

          const payload = {
            id: newAdmin.id,
            role: newAdmin.role
          }

          const token = jwt.sign(payload,process.env.SECRET,{
            expiresIn: '1h'
          });
      
          return {newAdmin,token};
      

    }catch (error) {
        throw new Error('Error creating admin: ' + error.message);
    }
}


async function loginAdminService(email, phoneNumber){

  

  try{
      
      
      const admin = await prisma.user.findUnique({
        where: {
          email_phoneNumber: {
            email: email,
            phoneNumber: phoneNumber,
          },
        },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          role: true, 
        }
      });
        console.log(admin);
      if (admin && admin.role === 'admin') {
        const payload = {
          id: admin.id,
          role: admin.role,
        };
  
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: '1h',
        });
        
        return {
          success: true,
          token: token,
        };
      } else {
        return {
          success: false,
          message: 'Access denied. You are not an admin.',
        };
      }
       
      
         
  
  }catch(error){
     console.log(error);
  }
}

module.exports = {
    createNewAdmin,
    loginAdminService
}