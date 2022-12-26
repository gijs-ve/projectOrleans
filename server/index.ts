import { Rooms, Data, Room } from '../types/types';

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
import {
    createRoom,
    emitToRoom,
    findRoomById,
    findRoomBySocketId,
    joinRoom,
    startRoom,
    socketIdIsHost,
    generateNewRooms,
    removePlayerFromRoom,
    toggleSpectator,
} from './roomSystem';
import { fillArena, getStartPositions, setPlayerDirection } from './gameSystem';
import { onTick } from './gameSystem/onTick';

//Socket setup
const io = new Server(server);

let rooms: Rooms = [];

//Timer to keep track in all rooms
const raiseTimer = () => {
    try {
        rooms = onTick(rooms);
        rooms.map((i: Room) => {
            const sendData: Data = { room: i };
            emitToRoom(rooms, i.id, sendData, io);
        });
    } catch (error) {
        console.log(error);
    }
};
setInterval(raiseTimer, 500);

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
            emitToRoom(rooms, newRoom.id, sendData, io);
        } catch (error) {
            console.log(error);
        }
    });
    //Starts a room
    socket.on('startRoom', (data: Data) => {
        try {
            const { roomId } = data;
            if (!socketIdIsHost(rooms, roomId, socket.id)) return;
            console.log(`User with ID ${socket.id} started room ${roomId}`);
            const { startedRooms, startedRoom } = startRoom(rooms, roomId);
            const { newRooms, newRoom } = fillArena(startedRooms, startedRoom);
            rooms = generateNewRooms(newRooms, getStartPositions(newRoom));
            const sendData = { room: findRoomById(rooms, roomId) };
            emitToRoom(rooms, newRoom.id, sendData, io);
        } catch (error) {
            console.log(error);
        }
    });
        //Toggle spectator
        socket.on('toggleSpectator', () => {
            try {
                const foundRoom = findRoomBySocketId(rooms, socket.id)
                if (!foundRoom) return
                rooms = generateNewRooms(rooms, toggleSpectator(foundRoom, socket.id));
                const sendData = { room: findRoomById(rooms, foundRoom.id)}
                emitToRoom(rooms, foundRoom.id, sendData, io)
            } catch (error) {
                console.log(error);
            }
        });

    //Changes direction of a player
    socket.on('setDirection', (data: Data) => {
        try {
            const { roomId, direction } = data;
            rooms = setPlayerDirection(rooms, roomId, socket.id, direction);
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
                console.log(`This user was the last user in it's room, the room was removed.`);
                return;
            }
            const sendData = { room: newRoom };
            emitToRoom(rooms, newRoom.id, sendData, io);
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
