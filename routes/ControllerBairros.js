const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");
const RegBairros = require("../model/RegBairros");
const RegCidades = require("../model/RegCidades");
const RegEstLocal = require("../model/RegEstLocal");

router.post("/Bairros/Save",adminAuth,(req, res)=>{
    var BairroName = req.body.BairroName;
    var EstLocal = req.body.EstLocalDesc;
    var Cidades = req.body.Cidades;
    RegBairros.findOne({
        where:{
            BairroName: BairroName
        }
    }).then(Bairros =>{
        if (Bairros == undefined) {
            RegBairros.create({
                BairroName: BairroName,
                RegEstLocalId: EstLocal,
                RegCidadeId: Cidades
            }).then(()=>{
                res.redirect("/Admin/Bairros");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    });
});

router.get("/Admin/Bairros",adminAuth,(req, res)=>{
    
    RegBairros.findAll({
        include:[
            {model: RegEstLocal},
            {model: RegCidades}]
    }).then(Bairros =>{
        RegCidades.findAll().then(Cidades =>{
            RegEstLocal.findAll().then(EstLocal =>{
                res.render("admin/Bairros/FormBairrosNew", {
                    Cidades: Cidades, 
                    Bairros: Bairros,
                    EstLocal: EstLocal
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

router.get("/admin/Bairros/Edit/:id", (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/admin/Bairros");
    }
    RegBairros.findByPk(id).then(Bairros =>{
        if (Bairros != undefined){
            RegCidades.findAll().then(Cidades => {
                RegEstLocal.findAll().then(EstLocal => {
                    res.render("admin/Bairros/FormBairrosEdit", {
                        Bairros: Bairros,
                        Cidades: Cidades,
                        EstLocal: EstLocal,
                });
                
                });
            });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/Bairros/update", (req, res) => {
    var id = req.body.id;
    var BairroName = req.body.BairroName;
    var EstLocal = req.body.EstLocalDesc;
    var Cidades = req.body.Cidades;

    RegBairros.update({
        BairroName: BairroName,
        RegEstLocalId: EstLocal,
        RegCidadeId: Cidades},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/Bairros");
        }).catch(erro =>{
            res.redirect("/");
    });
});

router.post("/Bairros/delete", (req, res)=>{
    var id = req.body.id;
    //Se diferente de nulo
    if (id != undefined){
        //Valida se é um numero se for
        if (!isNaN(id)){
            //metodo para deletar do banco de dados
            RegBairros.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/Bairros");
            });
        //Se não for um numero
        } else {
            res.redirect("/error_2");
        }
    } else {
        res.redirect("/error_2");
    }
});

RegBairros.sync({force: false});

module.exports = router;