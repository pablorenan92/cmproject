function adminAuth(req, res, next){
    if (req.session.Operad != undefined) {
        next();
    }else{
        res.redirect("/");
    }
}

module.exports = adminAuth