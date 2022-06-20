//Import library
const express = require("express");
const aplication = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const adminAuth = require("./middlewares/adminAuth");

//Import others
const connection = require('./connection/connection');

//Import controller
const ControllerEstLocal = require('./routes/ControllerEstLocal');
const ControllerTipEmp = require('./routes/ControllerTipEmp');
const ControllerTipLograd = require('./routes/ControllerTipLograd');
const ControllerUniFed = require('./routes/ControllerUniFed');
const ControllerOperad = require('./routes/ControllerOperad');
const ControllerLograd = require('./routes/ControllerLograd');
const ControllerCidades = require('./routes/ControllerCidades');
const ControllerBairros = require('./routes/ControllerBairros');
const ControllerEmp = require('./routes/ControllerEmp');
const ControllerTipCliente = require('./routes/ControllerTipClientes');


//Session
aplication.use(session({
    secret: "qwertyuiopçlkjhgfdsa", 
    cookie: {maxAge: 1800000},
    resave: true,
    saveUninitialized: true
}));
//Use
aplication.set('view engine','ejs');
aplication.use(express.static('public'));
aplication.use(bodyParser.urlencoded({extended: false}));
aplication.use(bodyParser.json());

//Test connection
connection
    .authenticate()
    .then(() =>{
        console.log("Database connected successfully!");
    }).catch((error)=>{
        console.log(error);
})
//Use Controller
aplication.use("/",ControllerEstLocal);
aplication.use("/",ControllerTipEmp);
aplication.use("/",ControllerTipLograd);
aplication.use("/",ControllerUniFed);
aplication.use("/",ControllerOperad);
aplication.use("/",ControllerLograd);
aplication.use("/",ControllerCidades);
aplication.use("/",ControllerBairros);
aplication.use("/",ControllerEmp);
aplication.use("/",ControllerTipCliente);

//Routes
aplication.get("/",(req, res)=>{
    res.render("admin/Operad/login");
});

aplication.get("/home",adminAuth,(req, res)=>{
    res.render("index");
});

//Server
aplication.listen(8080, function(erro){
    if (erro) {
        console.log("Something went wrong!");
    }else{
        console.log("running application!");
    }
})

