const jwt = require('jsonwebtoken'); 

const requireAuth = (req, res, next) => {
    const token = req.cookies.token; 
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message); 
                res.redirect('/login'); 
            } else {
                if(decodedToken.role !== 'admin') {
                    return res.status(403).render('login', { error: 'Unauthorized access. Admins only.' });
                }
                req.userId = decodedToken.userId; // Attach user ID to request object
                next();
            }
        });
    } else {
        res.redirect('/login'); 
    }
}

module.exports = requireAuth;