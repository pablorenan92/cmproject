const express = require("express");
const router = express.Router();
const RegTipEmp = require("../model/RegTipEmp");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.post("/TipEmp/Save",adminAuth,(req, res)=>{
    var TipEmpDesc = req.body.TipEmpDesc;
    RegTipEmp.findOne({
        where:{
            TipEmpDesc: TipEmpDesc
        }
    }).then(TipEmp =>{
        if (TipEmp == undefined) {
            RegTipEmp.create({
                TipEmpDesc: TipEmpDesc
            }).then(()=>{
                res.redirect("/Admin/TipEmp");
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

router.get("/admin/TipEmp",adminAuth,(req, res)=>{
    RegTipEmp.findAll().then(TipEmp =>{
        res.render("admin/TipEmp/FormTipEmpNew", {
            TipEmp: TipEmp
        })
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.get("/admin/TipEmp/Edit/:id",adminAuth,(req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/Admin/TipEmp");
    }
    RegTipEmp.findByPk(id).then(TipEmp =>{
        if (TipEmp != undefined){
                res.render("admin/TipEmp/FormTipEmpEdit", {
                    TipEmp: TipEmp,
                });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    });
});

router.post("/TipEmp/update",adminAuth,(req, res) => {
    var id = req.body.id;
    var TipEmpDesc = req.body.TipEmpDesc;
      
    RegTipEmp.update({
        TipEmpDesc: TipEmpDesc},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/TipEmp");
        }).catch(erro =>{
            res.redirect("/error_1");
    });
});

router.post("/TipEmp/delete",adminAuth,(req, res)=>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            RegTipEmp.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/TipEmp");
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

RegTipEmp.sync({force: false});

module.exports = router;