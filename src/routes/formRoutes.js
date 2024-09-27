const express = require('express');

const { submitVisitorForm } = require('../controllers/formController');
const Router = express.Router();

//router.get('/register', renderRegisterPage);

const formRoute = () => {
    Router.post('/submit/:adminId', submitVisitorForm);
    return Router;
}

module.exports = formRoute;
