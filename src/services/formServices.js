// services/visitorService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const handleVisitorSubmission = async (adminId, email, phoneNumber) => {
  try {
    // Fetch the admin who owns the QR code
    const admin = await prisma.user.findUnique({
      where: { id: parseInt(adminId) }
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    // Check if the visitor is the same as the admin (cannot submit to own QR code)
    if (admin.email === email || admin.phoneNumber === phoneNumber) {
      throw new Error('You cannot scan and submit your own QR code.');
    }

    // Check if the visitor already exists by email or phone number
    let visitor = await prisma.user.findUnique({
        where: {
            email,
            phoneNumber
          }
    });

    if (!visitor) {
      // If visitor doesn't exist, create a new visitor
      visitor = await prisma.user.create({
        data: {
          name: 'Guest',  // Assign a default name if name isn't available
          email,
          phoneNumber,
          role: 'visitor'
        }
      });
    }

    // Create a new entry in VisitorAdminLink to track submission time
    const submission = await prisma.visitorAdminLink.create({
      data: {
        visitorId: visitor.id,
        adminId: admin.id,
        scannedAt: new Date()
      }
    });

    return submission;
  } catch (error) {
    throw new Error(`Error handling visitor submission`);
  }
};

module.exports = { handleVisitorSubmission };
