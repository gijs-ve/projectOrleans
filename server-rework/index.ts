import { Data, Room, Rooms } from '../types/types';
//Functions
import {
    emitRoomToRoom,
    findRoomById,
    findRoomBySocketId,
    handleSpectatorToggle,
    joinRoom,
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
const toggleSpectator = require('./socket/toggleSpectator');
const setDirection = require('./socket/setDirection');
const onConnection = (socket: Socket) => {
    try {
        createRoom(io, socket);
        toggleSpectator(io, socket);
        setDirection(io, socket);
    } catch (error) {
        console.log(error);
    }
};
io.on('connect', onConnection);
io.on('connect', (socket: any) => {
    console.log(`User ${socket.id} connected`);

    //Handles a player attempting to join a room
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
            emitRoomToRoom(newRoom.id, io);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', (reason: string) => {
        try {
            console.log(`User ${socket.id} disconnected (${reason}).`);
            const playerRemoved = removePlayerFromRoom(rooms, socket.id);
            if (!playerRemoved) {
                console.log(`This user was not active in a single room.`);
                return;
            }
            const { newRooms, newRoom } = playerRemoved;
            console.log(
                `This user has been removed from room with ID ${newRoom.id}.`,
            );
            rooms = newRooms;
            if (!newRoom) {
                console.log(
                    `This user was the last user in it's room, the room was removed.`,
                );
                return;
            }
            const sendData = { room: newRoom };
            emitRoomToRoom(newRoom.id, io);
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
