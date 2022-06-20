const express = require("express");
const router = express.Router();
const RegVendedor = require("../model/RegVendedor");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.post("/TipEmp/Save",adminAuth,(req, res)=>{
    var TipEmpDesc = req.body.TipEmpDesc;
    RegVendedor.findOne({
        where:{
            TipEmpDesc: TipEmpDesc
        }
    }).then(TipEmp =>{
        if (TipEmp == undefined) {
            RegVendedor.create({
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
    RegVendedor.findAll().then(TipEmp =>{
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
    RegVendedor.findByPk(id).then(TipEmp =>{
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
      
    RegVendedor.update({
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
            RegVendedor.destroy({
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

RegVendedor.sync({force: false});

module.exports = router;