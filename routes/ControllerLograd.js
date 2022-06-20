const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");
const RegLograd = require("../model/RegLograd");
const RegTipLograd = require("../model/RegTipLograd");


router.post("/Lograd/Save",adminAuth,(req, res)=>{
    var LogradName = req.body.LogradName;
    var TipLograd = req.body.TipLograd;
    RegLograd.findOne({
        where:{
            LogradName: LogradName
        }
    }).then(Lograd =>{
        if (Lograd == undefined) {
            RegLograd.create({
                LogradName: LogradName,
                RegTipLogradId: TipLograd
            }).then(()=>{
                res.redirect("/Admin/Lograd");
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

router.get("/Admin/Lograd",adminAuth,(req, res)=>{
    RegLograd.findAll({
        include:[{model: RegTipLograd}]
    }).then(Lograd =>{
        RegTipLograd.findAll().then(TipLograd =>{
            res.render("admin/Lograd/FormLogradNew", {
                TipLograd: TipLograd,
                Lograd: Lograd
            });
        }) .catch((error)=>{
            res.redirect("/error_1");
        });
        }).catch((error)=>{
        res.redirect("/error_1");
    });  
});
router.get("/Admin/Lograd",adminAuth,(req, res)=>{
    
    RegLograd.findAll({
        include: [{model: RegTipLograd}]
    }).then(Lograd =>{
        RegTipLograd.findAll().then(TipLograd =>{
            res.render("admin/Bairros/FormLogradNew", {
                    Lograd: Lograd, 
                    TipLograd: TipLograd,
            });
           
        }).catch((error)=>{
            res.redirect("/error_1");
        });
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.get("/admin/Lograd/Edit/:id", (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/admin/Lograd");
    }
    RegLograd.findByPk(id).then(Lograd =>{
        if (Lograd != undefined){
            RegTipLograd.findAll().then(TipLograd => {
                res.render("adminLograd/FormLogradEdit", {
                    Lograd: Lograd,
                    TipLograd: TipLograd,
                });
            });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/Lograd/update", (req, res) => {
    var id = req.body.id;
    var LogradName = req.body.LogradName;
    var TipLograd = req.body.TipLograd;
   
    RegLograd.update({
        LogradName: LogradName,
        RegTipLogradId: TipLograd},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/Lograd");
        }).catch(erro =>{
            res.redirect("/");
    });
});

router.post("/Lograd/delete", (req, res)=>{
    var id = req.body.id;
    //Se diferente de nulo
    if (id != undefined){
        //Valida se é um numero se for
        if (!isNaN(id)){
            //metodo para deletar do banco de dados
            RegLograd.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/Lograd");
            }).catch(erro =>{
                res.redirect("/");
            });
        //Se não for um numero
        } else {
            res.redirect("/error_2");
        }
    } else {
        res.redirect("/error_2");
    }
});

RegLograd.sync({force: false});

module.exports = router;