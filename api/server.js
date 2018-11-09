const express= require("express");
const server= express();
const actionDB= require('../data/helpers/actionModel');
const projectDB= require('../data/helpers/projectModel');
server.use(express.json());
console.log('working');
module.exports=server;