const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");
const RegLograd = require("../model/RegLograd");
const RegBairros = require("../model/RegBairros");
const RegCidades = require("../model/RegCidades");
const RegEmp = require('../model/RegEmp');
const RegTipEmp = require("../model/RegTipEmp");

router.post("/Empresas/Save",adminAuth,(req, res)=>{
    
    var CompCodIbge = req.body.CompCodIbge;
    var TipEmpDesc = req.body.TipEmpDesc;
    var CompDefault = req.body.CompDefault;
    var CompName = req.body.CompName;
    var CompCnpj = req.body.CompCnpj;
    var CompInsEst = req.body.CompInsEst;
    var CompCep = req.body.CompCep;
    var LogradName = req.body.LogradName;
    var BairroName = req.body.BairroName;
    var CitName = req.body.CitName;
    var CompNum = req.body.CompNum;
    var CompTel = req.body.CompTel;
    var CompTelCel = req.body.CompTelCel;
    RegEmp.findOne({
        where:{
            CompName: CompName
        }
    }).then(Empresas =>{
        if (Empresas == undefined) {
            RegEmp.create({
                CompCodIbge: CompCodIbge,
                RegTipEmpId: TipEmpDesc,
                CompDefault: CompDefault,
                CompName: CompName,
                CompCnpj: CompCnpj,
                CompInsEst: CompInsEst,
                CompCep: CompCep,
                RegLogradId: LogradName,
                RegBairroId: BairroName,
                RegCidadeId: CitName,
                CompNum: CompNum,
                CompTel: CompTel,
                CompTelCel: CompTelCel
            }).then(()=>{
                res.redirect("/admin/Empresas");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    });
});

router.get("/admin/Empresas",adminAuth,(req, res)=>{
    RegEmp.findAll({
        include:[
        {model: RegCidades},
        {model: RegBairros},
        {model: RegLograd},
        {model: RegTipEmp}]
    }).then(Empresas =>{
        RegLograd.findAll().then(Lograd =>{
            RegBairros.findAll().then(Bairros =>{
                RegCidades.findAll().then(Cidades =>{
                    RegTipEmp.findAll().then(TipEmp =>{
                        res.render("admin/Empresas/FormEmpNew", {
                            Lograd: Lograd, 
                            Bairros: Bairros,
                            Cidades: Cidades,
                            Empresas: Empresas,
                            TipEmp: TipEmp

                        });
                    }).catch((error)=>{
                        res.redirect("/error_1");
                    }); 
                }).catch((error)=>{
                    res.redirect("/error_1");
                }); 
            }).catch((error)=>{
                res.redirect("/error_1");
            }); 
        });
    }).catch((error)=>{
        res.redirect("/error_1");
    });  
});

router.get("/admin/Empresas/Edit/:id", (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/admin/Empresas");
    }
    RegEmp.findByPk(id).then(Empresas =>{
        if (Empresas != undefined){
            RegLograd.findAll().then(Lograd =>{
                RegBairros.findAll().then(Bairros =>{
                    RegCidades.findAll().then(Cidades =>{
                        RegTipEmp.findAll().then(TipEmp =>{
                            res.render("admin/Empresas/FormEmpEdit", {
                                Lograd: Lograd, 
                                Bairros: Bairros,
                                Cidades: Cidades,
                                Empresas: Empresas,
                                TipEmp: TipEmp
                            });
                        }).catch(erro => {
                            res.redirect("/error_1");
                        });
                    }).catch(erro => {
                        res.redirect("/error_1");
                    });
                }).catch(erro => {
                    res.redirect("/error_1");
                });
            }).catch(erro => {
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    });
});

router.post("/Empresas/update", (req, res) => {
    var id = req.body.id;
    var CompCodIbge = req.body.CompCodIbge;
    var TipEmpDesc = req.body.TipEmpDesc;
    var CompDefault = req.body.CompDefault;
    var CompName = req.body.CompName;
    var CompCnpj = req.body.CompCnpj;
    var CompInsEst = req.body.CompInsEst;
    var CompCep = req.body.CompCep;
    var LogradName = req.body.LogradName;
    var BairroName = req.body.BairroName;
    var CitName = req.body.CitName;
    var CompNum = req.body.CompNum;
    var CompTel = req.body.CompTel;
    var CompTelCel = req.body.CompTelCel;
    RegEmp.update({
        CompCodIbge: CompCodIbge,
        RegTipEmpId: TipEmpDesc,
        CompDefault: CompDefault,
        CompName: CompName,
        CompCnpj: CompCnpj,
        CompInsEst: CompInsEst,
        CompCep: CompCep,
        RegLogradId: LogradName,
        RegBairroId: BairroName,
        RegCidadeId: CitName,
        CompNum: CompNum,
        CompTel: CompTel,
        CompTelCel: CompTelCel},{
        where:{
            id: id
        }
        }).then(() =>{
        res.redirect("/admin/Empresas");
        }).catch(erro =>{
            res.redirect("/error_1");
    });
});

router.post("/Empresas/delete", (req, res)=>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            RegEmp.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/Empresas");
            });
        } else {
            res.redirect("/error_2");
        }
    } else {
        res.redirect("/error_2");
    }
});

RegEmp.sync({force: false});

module.exports = router;