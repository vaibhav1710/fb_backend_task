const express = require('express');
const {renderRegisterPage, registerAdmin, renderForm, renderLoginAdminPage, loginAdmin,handleLogout} = require('../controllers/authController');
const Router = express.Router();

//router.get('/register', renderRegisterPage);

const userRoute = () => {
    Router.get('/register', renderRegisterPage);
    Router.post('/register', registerAdmin)
    Router.get('/form/:adminId', renderForm);
    Router.get('/login', renderLoginAdminPage)
    Router.post('/login', loginAdmin);
    Router.post('/logout', handleLogout)
    return Router;
}


module.exports = userRoute;