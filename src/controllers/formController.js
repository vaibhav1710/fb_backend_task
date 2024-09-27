// controllers/visitorController.js
const { handleVisitorSubmission } = require('../services/formServices');

const submitVisitorForm = async (req, res) => {
  const { adminId } = req.params;  // Admin ID from the URL
  const { email, phoneNumber } = req.body;
  
  try {
    // Validate email and phone number length
    if (!validateEmail(email) || !/^\d{10}$/.test(phoneNumber)) {
      return res.render('form', { error: 'Invalid email or phone number', adminId });
    }

    // Handle the visitor form submission
    await handleVisitorSubmission(adminId, email, phoneNumber);

    // Redirect to a success page or show a success message
    res.render('success', { message: 'Form submitted successfully!', error:null });
  } catch (error) {
    // Handle any errors during the form submission process
    res.render('success', { error: error.message, message:null});
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = { submitVisitorForm };
