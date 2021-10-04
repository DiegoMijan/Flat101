const express = require('express');
const {setRoutes} = require('./routes');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.urlencoded({extended:true}));
server.use(express.json());

setRoutes(server);
module.exports = {server}