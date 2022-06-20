const express = require("express");
const session = require("express-session");
const router = express.Router();
const RegOperad = require("../model/RegOperad");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");
const nodemailer = require("nodemailer");

router.post("/authenticate",(req, res)=>{
    var OperadEmail = req.body.OperadEmail;
    var OperadPass = req.body.OperadPass;
    RegOperad.findOne({
        where:{
            OperadEmail: OperadEmail
        }
    }).then((Operad) =>{
        if (Operad != undefined){
            var correct = bcrypt.compareSync(OperadPass,Operad.OperadPass);
            if (correct){
                req.session.Operad = {
                    id: Operad.id,
                    OperadEmail: Operad.OperadEmail
            }
            res.redirect("/home");
        } else {
            res.redirect("/");
        } 
    }}).catch((erro)=>{
        res.redirect("/");
    })
});

router.post("/Operad/Save",(req, res)=>{
    var OperadFirstName = req.body.OperadFirstName;
    var OperadLastName = req.body.OperadLastName;
    var OperadEmail = req.body.OperadEmail;
    var OperadPass = req.body.OperadPass;
    RegOperad.findOne({
        where:{
            OperadEmail: OperadEmail
        }
    }).then(Operad =>{
        if (Operad == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(OperadPass, salt);
            RegOperad.create({
                OperadFirstName: OperadFirstName,
                OperadLastName: OperadLastName,
                OperadEmail: OperadEmail,
                OperadPass: hash
            }).then(()=>{
                res.redirect("/Admin/Operad");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    }).catch((erro)=>{
        res.redirect("/error_1");
    })
});

router.get("/Admin/Operad",adminAuth,(req, res)=>{
    RegOperad.findAll({}).then(Operad =>{
        res.render("admin/Operad/FormOperadNew",{Operad: Operad});
    }).catch((erro)=>{
        res.redirect("/error_1");
    });    
});

router.get("/admin/Operad/Edit/:id",adminAuth, (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/admin/Operad");
    }
    RegOperad.findByPk(id).then(Operad =>{

        if (Operad != undefined){
                res.render("admin/Operad/FormOperadEdit",{Operad: Operad});
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/Operad/update",(req, res)=>{
    var id = req.body.id;
    var OperadFirstName = req.body.OperadFirstName;
    var OperadLastName = req.body.OperadLastName;
    var OperadEmail = req.body.OperadEmail;
    var OperadPass = req.body.OperadPass;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(OperadPass, salt);

    RegOperad.update({
        OperadFirstName: OperadFirstName,
        OperadLastName: OperadLastName,
        OperadEmail: OperadEmail,
        OperadPass: hash},{
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect("/Admin/Operad");
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.post("/Operad/delete",adminAuth, (req, res)=>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            RegOperad.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/Operad");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    } else {
        res.redirect("/error_2");
    }
});

router.get("/register",(req, res)=>{
    res.render("admin/Operad/register");
});
router.get("/forgotPassword",(req, res)=>{
    res.render("admin/Operad/password");
});
router.get("/error_1",(req, res)=>{
    res.render("message/error_1");
});
router.get("/error_2",(req, res)=>{
    res.render("message/error_2");
});
router.get("/success",(req, res)=>{
    res.render("message/success");
});
router.get("/logout",(req, res)=>{
    req.session.Operad = undefined;
    res.redirect("/");
});

router.get("/search",(req, res)=>{
    res.render("admin/Operad/search");
});

RegOperad.sync({force: false});

module.exports = router;
