import {
    emitRoomToRoom,
    findRoomById,
    handleRoomStart,
    socketIdIsHost,
} from '../roomSystem';

import { Data } from '../../types/types';
import { IO } from './createServer';
import { Socket } from 'socket.io';
import store from '../store';

//Starts a room
module.exports = (io: IO, socket: Socket) => {
    const startRoom = (data: Data) => {
        try {
            const { roomId } = data;
            const { rooms } = store.getState().roomState;
            if (!socketIdIsHost(rooms, roomId, socket.id)) return;
            console.log(`User with ID ${socket.id} started room ${roomId}`);
            handleRoomStart(roomId);
            emitRoomToRoom(roomId, io);

            console.log('started ROOM', findRoomById(roomId));
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('startRoom', startRoom);
};
