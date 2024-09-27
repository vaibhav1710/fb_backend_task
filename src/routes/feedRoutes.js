const express = require('express');

const { getFeedPage, getVisitors } = require('../controllers/feedController');
const requireAuth = require('../middlewares/authMiddleware');
const Router = express.Router();

//router.get('/register', renderRegisterPage);

const feedRoute = () => {
    Router.get('/feed', getFeedPage);
    Router.get('/admin/:adminId/visitors', requireAuth ,getVisitors);
    return Router;
}


module.exports = feedRoute;