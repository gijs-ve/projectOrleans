import { Socket } from 'socket.io';
import {
    ServerToClientEvents,
    ClientToServerEvents,
    Rooms,
    SocketData,
} from '../types/types';

const corsMiddleWare = require('cors');
const { Server } = require('socket.io');
//Server setup
const express = require('express');
const app = express();
// HTTP Server setup
const http = require('http');
const server = http.createServer(app);

const PORT = 4000;

//Function
import { createRoom } from './roomSystem/createRoom';

//Socket setup
const io = new Server(server);

let rooms: Rooms = [];

io.on('connect', (socket) => {
    console.log(`User ${socket.id} connected`);
    socket.on('createRoom', (name: string) => {
        rooms = createRoom(rooms, name, socket.id);
    });
    socket.on('disconnect', (reason) => {
        console.log(`User ${socket.id} disconnected (${reason})`);
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
