import { addPlayerToRoom, emitRoomToRoom } from '../roomSystem';

import { IO } from './createServer';
import { Socket } from 'socket.io';

module.exports = (io: IO, socket: Socket) => {
    const joinRoom = (data: { roomId: string; playerName: string }) => {
        try {
            const { roomId, playerName } = data;
            console.log(
                `User ${playerName} ${socket.id} joined room ${roomId}`,
            );
            addPlayerToRoom(roomId, playerName, socket.id);
            emitRoomToRoom(roomId, io);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('joinRoom', joinRoom);
};
