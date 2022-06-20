const express = require("express");
const router = express.Router();
const RegTipLograd = require("../model/RegTipLograd");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.post("/TipLograd/Save",adminAuth,(req, res)=>{
    var TipLogradDesc = req.body.TipLogradDesc;
    RegTipLograd.findOne({
        where:{
            TipLogradDesc: TipLogradDesc
        }
    }).then(TipLograd =>{
        if (TipLograd  == undefined) {
            RegTipLograd.create({
                TipLogradDesc: TipLogradDesc
            }).then(()=>{
                res.redirect("/Admin/TipLograd");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.get("/Admin/TipLograd",adminAuth,(req, res)=>{
    RegTipLograd.findAll().then(TipLograd =>{
        res.render("admin/TipLograd/FormTipLogradNew", {
            TipLograd: TipLograd
        })
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.get("/admin/TipLograd/Edit/:id",adminAuth,(req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/Admin/TipLograd");
    }
    RegTipLograd.findByPk(id).then(TipLograd =>{
        if (TipLograd != undefined){
                res.render("admin/TipLograd/FormTipLogradEdit", {
                    TipLograd: TipLograd,
                });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    });
});

router.post("/TipLograd/update",adminAuth,(req, res) => {
    var id = req.body.id;
    var TipLogradDesc = req.body.TipLogradDesc;
      
    RegTipLograd.update({
        TipLogradDesc: TipLogradDesc},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/TipLograd");
        }).catch(erro =>{
            res.redirect("/error_1");
    });
});

router.post("/TipLograd/delete",adminAuth,(req, res)=>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            RegTipLograd.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/TipLograd");
            }).catch(erro => {
                res.redirect("/error_1");
            });        
        } else {
            res.redirect("/error_2");
        }
    } else {
        res.redirect("/error_2");
    }
});

RegTipLograd.sync({force: false});

module.exports = router;