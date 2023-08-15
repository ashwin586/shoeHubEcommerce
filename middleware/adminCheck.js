require('dotenv').config();

const adminIsLogged = async (req, res, next) =>{
    if(req.session.adminEmail){
        next();
    } else {
        res.render("admin_login");
    }
}

module.exports = adminIsLogged;