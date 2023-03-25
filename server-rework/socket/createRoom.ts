import { findRoomBySocketId, handleRoomCreation } from '../roomSystem';

import { Data } from '../../types/types';
import { IO } from './createServer';
import { Socket } from 'socket.io';

module.exports = (io: IO, socket: Socket) => {
    const createRoom = (data: any) => {
        try {
            const { playerName } = data;
            console.log(`User ${playerName} ${socket.id} created a room`);
            handleRoomCreation(playerName, socket.id);
            const sendData: Data = { room: findRoomBySocketId(socket.id) };
            socket.emit('sendRoom', sendData);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('createRoom', createRoom);
};
