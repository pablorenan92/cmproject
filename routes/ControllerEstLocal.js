const express = require("express");
const router = express.Router();
const RegEstLocal = require("../model/RegEstLocal");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.post("/EstLocal/Save", adminAuth, (req, res)=>{
    var EstLocalDesc = req.body.EstLocalDesc;
    if (EstLocalDesc != undefined) {
        RegEstLocal.create({
            EstLocalDesc: EstLocalDesc
        }).then(()=>{
            res.redirect("/Admin/EstLocal");
        }).catch((error)=>{
            res.redirect("/error_1");
        });
    }else{
        res.redirect("/admin/EstLocal/FormEstLocalNew");
    }
})

router.get("/Admin/EstLocal",adminAuth,(req, res)=>{
    RegEstLocal.findAll().then(EstLocal =>{
        res.render("admin/EstLocal/FormEstLocalNew", {
            EstLocal: EstLocal
        });
    }).catch((error)=>{
        res.redirect("/error_1");
    });
});

router.get("/admin/EstLocal/Edit/:id", (req, res)=>{
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/Admin/EstLocal");
    }
    RegEstLocal.findByPk(id).then(EstLocal =>{
        if (EstLocal != undefined){
            res.render("admin/EstLocal/FormEstLocalEdit", {
            EstLocal: EstLocal,
        });
        } else {
            res.redirect("/error_2");
        }
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/EstLocal/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var EstLocalDesc = req.body.EstLocalDesc;

    RegEstLocal.update({EstLocalDesc: EstLocalDesc,},{
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect("/Admin/EstLocal");
    }).catch(erro => {
        res.redirect("/error_1");
    })
});

router.post("/EstLocal/delete", adminAuth, (req, res)=>{
    var id = req.body.id;
     if (id != undefined){
        if (!isNaN(id)){
            RegEstLocal.destroy({
                where: {
                    id: id
                }  
            }).then(()=>{
                res.redirect("/Admin/EstLocal");
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

RegEstLocal.sync({force: false});

module.exports = router;