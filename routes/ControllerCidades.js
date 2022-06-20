const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");
const RegCidades = require("../model/RegCidades");
const RegUniFed = require("../model/RegUniFed");


router.post("/Cidades/Save",adminAuth,(req, res)=>{
    var CitName = req.body.CitName;
    var CitCodExt = req.body.CitCodExt;
    var UniFed = req.body.UniFed;
    RegCidades.findOne({
        where:{
            CitName: CitName
        }
    }).then(Cidades =>{
        if (Cidades == undefined) {
            RegCidades.create({
                CitName: CitName,
                CitCodExt: CitCodExt,
                RegUniFedId: UniFed
            }).then(()=>{
                res.redirect("/admin/Cidades");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_2");
        }
    });
});

router.get("/Admin/Cidades",adminAuth,(req, res)=>{
    
    RegCidades.findAll({
        include:[{model: RegUniFed
        }]
    }).then(Cidades =>{
        RegUniFed.findAll().then(UniFed =>{
            res.render("admin/Cidades/FormCidadesNew", {
                Cidades: Cidades, 
                UniFed: UniFed,
            });
        }).catch((error)=>{
            res.redirect("/error_1");
        });
    })    
});
router.get("/admin/Cidades/Edit/:id",adminAuth, (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/admin/Cidades");
    }
    RegCidades.findByPk(id).then(Cidades =>{

        if (Cidades != undefined){
                RegUniFed.findAll().then(UniFed => {
                res.render("admin/Cidades/FormCidadesEdit", {
                        Cidades: Cidades,
                        UniFed: UniFed,
                });
                
                });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/Cidades/update",adminAuth, (req, res) => {
    var id = req.body.id;
    var CitName = req.body.CitName;
    var CitCodExt = req.body.CitCodExt;
    var UniFed = req.body.UniFed;

    RegCidades.update({
        CitName: CitName,
        CitCodExt: CitCodExt,
        RegUniFedId: UniFed},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/Cidades");
        }).catch(erro =>{
            res.redirect("/");
    });
});

router.post("/Cidades/delete",adminAuth, (req, res)=>{
    var id = req.body.id;
    if (id != undefined){
        if (!isNaN(id)){
            RegCidades.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/admin/Cidades");
            });
        //Se não for um numero
        } else {
            res.redirect("/error_2");
        }
    } else {
        res.redirect("/error_2");
    }
});

RegCidades.sync({force: false});

module.exports = router;