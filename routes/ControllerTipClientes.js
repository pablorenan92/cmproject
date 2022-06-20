const express = require("express");
const router = express.Router();
const RegTipCliente = require("../model/RegTipCliente");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.post("/TipCliente/Save",adminAuth,(req, res)=>{
    var TipClienteDesc = req.body.TipClienteDesc;
    RegTipCliente.findOne({
        where:{
            TipClienteDesc: TipClienteDesc
        }
    }).then(TipCliente =>{
        if (TipCliente  == undefined) {
            RegTipCliente.create({
                TipClienteDesc: TipClienteDesc
            }).then(()=>{
                res.redirect("/Admin/TipCliente");
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

router.get("/Admin/TipCliente",adminAuth,(req, res)=>{
    RegTipCliente.findAll().then(TipCliente =>{
        res.render("admin/TipCliente/FormTipClienteNew", {
            TipCliente: TipCliente
        })
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.get("/admin/TipCliente/Edit/:id",adminAuth,(req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/Admin/TipCliente");
    }
    RegTipCliente.findByPk(id).then(TipCliente =>{
        if (TipCliente != undefined){
                res.render("admin/TipCliente/FormTipClienteEdit", {
                    TipCliente: TipCliente,
                });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    });
});

router.post("/TipCliente/update",adminAuth,(req, res) => {
    var id = req.body.id;
    var TipClienteDesc = req.body.TipClienteDesc;
      
    RegTipCliente.update({
        TipClienteDesc: TipClienteDesc},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/TipCliente");
        }).catch(erro =>{
            res.redirect("/error_1");
    });
});

router.post("/TipCliente/delete",adminAuth,(req, res)=>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            RegTipCliente.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/TipCliente");
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

RegTipCliente.sync({force: false});

module.exports = router;