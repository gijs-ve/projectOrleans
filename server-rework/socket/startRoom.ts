import {
    emitRoomToRoom,
    findRoomById,
    handleRoomStart,
    socketIdIsHost,
} from 'roomSystem';
import { fillArena, getStartPositions } from 'gameSystem';

import { Data } from '../../types/types';
import { IO } from './createServer';
import { Socket } from 'socket.io';
import store from '../store';

//Starts a room
module.exports = (io: IO, socket: Socket) => {
    const startRoom = (data: any) => {
        try {
            const { roomId } = data;
            const { rooms } = store.getState().roomState;
            if (!socketIdIsHost(rooms, roomId, socket.id)) return;
            console.log(`User with ID ${socket.id} started room ${roomId}`);
            handleRoomStart(roomId);
            emitRoomToRoom(roomId, io);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('startRoom', startRoom);
};
