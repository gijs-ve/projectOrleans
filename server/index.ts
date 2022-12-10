const corsMiddleWare = require('cors');
const { Server } = require('socket.io');
//Server setup
const express = require('express');
const app = express();
// HTTP Server setup
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT;

//Models
const Users = require('./models/').users;
const Settings = require('./models/').settings;

//Socket setup
const io = new Server(server);
const { v4 } = require('uuid');
let rooms = [];
