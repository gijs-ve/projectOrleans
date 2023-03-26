import {
    emitRoomToRoom,
    findRoomById,
    findRoomBySocketId,
    handleRoomStart,
    socketIdIsHost,
} from '../../roomSystem';

import { Data } from '../../../types/types';
import { IO } from './../createServer';
import { Socket } from 'socket.io';
import store from '../../store';

//Starts a room
module.exports = (io: IO, socket: Socket) => {
    const __resetRoom = () => {
        try {
            const roomId = findRoomBySocketId(socket.id).id;
            const { rooms } = store.getState().roomState;
            if (!socketIdIsHost(rooms, roomId, socket.id)) return;
            console.log(`RESET`);
            handleRoomStart(roomId);
            emitRoomToRoom(roomId, io);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('__resetRoom', __resetRoom);
};
