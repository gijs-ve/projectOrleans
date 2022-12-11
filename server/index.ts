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
import { createRoom, emitToRoom, joinRoom } from './roomSystem';

//Socket setup
const io = new Server(server);

let rooms: Rooms = [];

io.on('connect', (socket: any) => {
    console.log(`User ${socket.id} connected`);
    socket.on('createRoom', (data: Data) => {
        try {
            const { playerName } = data;
            console.log(`User ${playerName} ${socket.id} created a room`);
            const { newRooms, newRoom } = createRoom(
                rooms,
                playerName,
                socket.id,
            );
            rooms = newRooms;
            const sendData: Data = { room: newRoom };

            socket.emit('sendRoom', sendData);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('joinRoom', (data: Data) => {
        try {
            const { roomId, playerName } = data;
            console.log(
                `User ${playerName} ${socket.id} joined room ${roomId}`,
            );
            const { newRooms, newRoom } = joinRoom(
                rooms,
                roomId,
                playerName,
                socket.id,
            );
            rooms = newRooms;
            const sendData = { room: newRoom };
            emitToRoom(rooms, newRoom.id, sendData, io);
            // const sendData: Data = { room: newRoom };

            // socket.emit('sendRoom', sendData);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', (reason: string) => {
        console.log(`User ${socket.id} disconnected (${reason})`);
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
