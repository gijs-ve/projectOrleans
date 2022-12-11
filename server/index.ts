import { Socket } from 'socket.io';
import {
    ServerToClientEvents,
    ClientToServerEvents,
    Rooms,
    Data,
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

//Functions
import { createRoom } from './roomSystem/createRoom';

//Socket setup
const io = new Server(server);

let rooms: Rooms = [];

io.on('connect', (socket: any) => {
    console.log(`User ${socket.id} connected`);
    socket.on('createRoom', (data: Data) => {
        const { roomName } = data;
        console.log(`${socket.id} created a room`);
        const { newRooms, newRoom } = createRoom(rooms, roomName, socket.id);
        rooms = newRooms;
        const sendData: Data = { room: newRoom };
        console.log(sendData);
        socket.emit('sendRoom', sendData);
    });
    socket.on('disconnect', (reason: string) => {
        console.log(`User ${socket.id} disconnected (${reason})`);
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
