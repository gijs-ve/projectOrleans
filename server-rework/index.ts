import { Data, Room, Rooms } from '../types/types';
//Functions
import {
    addPlayerToRoom,
    emitRoomToRoom,
    findRoomById,
    findRoomBySocketId,
    handleSpectatorToggle,
    removePlayerFromRoom,
    socketIdIsHost,
} from './roomSystem';
import { fillArena, getStartPositions, setPlayerDirection } from './gameSystem';
import { generateNewRooms, setRoom } from 'store';

import { Socket } from 'socket.io';
import { createServer } from 'socket/createServer';
import { onTick } from './gameSystem/onTick';

const corsMiddleWare = require('cors');
const { Server } = require('socket.io');

//Server setup
const express = require('express');
const app = express();
// HTTP Server setup
const http = require('http');
const { server, io } = createServer();

const PORT = 4000;

let rooms: Rooms = [];

//Timer to keep track in all rooms
const raiseTimer = () => {
    try {
        rooms = onTick(rooms);
        rooms.map((i: Room) => {
            const sendData: Data = { room: i };
            emitRoomToRoom(i.id, io);
        });
    } catch (error) {
        console.log(error);
    }
};
setInterval(raiseTimer, 500);

const createRoom = require('./socket/createRoom');
const joinRoom = require('./socket/joinRoom');
const setDirection = require('./socket/setDirection');
const startRoom = require('./socket/startRoom');
const toggleSpectator = require('./socket/toggleSpectator');
const onDisconnect = require('./socket/onDisconnect');

const onConnection = (socket: Socket) => {
    try {
        createRoom(io, socket);
        joinRoom(io, socket);
        setDirection(io, socket);
        startRoom(io, socket);
        toggleSpectator(io, socket);
        onDisconnect(io, socket);
    } catch (error) {
        console.log(error);
    }
};
io.on('connect', onConnection);
io.on('connect', (socket: any) => {
    console.log(`User ${socket.id} connected`);
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
