const express = require("express");
const router = express.Router();
const RegUniFed = require("../model/RegUniFed");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.post("/UniFed/Save",adminAuth,(req, res)=>{
    var UniFedDesc = req.body.UniFedDesc;
    var UniFedSigla = req.body.UniFedSigla;
    RegUniFed.findOne({
        where:{
            UniFedDesc: UniFedDesc
        }
    }).then(UniFed =>{
        if (UniFed == undefined) {
            RegUniFed.create({
                UniFedDesc: UniFedDesc,
                UniFedSigla: UniFedSigla
            }).then(()=>{
                res.redirect("/Admin/UniFed");
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

router.get("/admin/UniFed",adminAuth,(req, res)=>{
    RegUniFed.findAll().then(UniFed =>{
        res.render("admin/UniFed/FormUniFedNew", {
            UniFed: UniFed
        })
    });
});

router.get("/admin/UniFed/Edit/:id", (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/Admin/UniFed");
    }
    RegUniFed.findByPk(id).then(UniFed =>{
        if (UniFed != undefined){
            res.render("admin/UniFed/FormUniFedEdit", {
            UniFed: UniFed,
        });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/UniFed/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var UniFedDesc = req.body.UniFedDesc;
    var UniFedSigla = req.body.UniFedSigla;

    RegUniFed.update({UniFedDesc: UniFedDesc,UniFedSigla: UniFedSigla},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/Admin/UniFed");
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/UniFed/delete", adminAuth, (req, res)=>{
    var id = req.body.id;
     if (id != undefined){
        if (!isNaN(id)){
            RegUniFed.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/Admin/UniFed");
            }).catch((error)=>{
                res.redirect("/error_1");
            });
        } else {
            res.redirect("/error_1");
        }
    } else {
        res.redirect("/error_1");
    }
});


RegUniFed.sync({force: false});

module.exports = router;