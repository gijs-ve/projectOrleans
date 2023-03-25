//Toggle spectator
import {
    emitRoomToRoom,
    findRoomBySocketId,
    handleSpectatorToggle,
} from '../roomSystem';

import { IO } from './createServer';
import { Socket } from 'socket.io';
import { setRoom } from '../store';

module.exports = (io: IO, socket: Socket) => {
    const toggleSpectator = () => {
        try {
            const foundRoom = findRoomBySocketId(socket.id);
            if (!foundRoom) return;
            const newRoom = handleSpectatorToggle(foundRoom, socket.id);
            setRoom(newRoom);
            emitRoomToRoom(foundRoom.id, io);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('toggleSpectator', toggleSpectator);
};
