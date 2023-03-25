import { emitRoomToRoom, handlePlayerRemoval } from 'roomSystem';
import store, { setRooms } from 'store';

import { IO } from './createServer';
import { Socket } from 'socket.io';

module.exports = (io: IO, socket: Socket) => {
    const onDisconnect = (reason: string) => {
        try {
            console.log(`User ${socket.id} disconnected (${reason}).`);
            const playerRemoved = handlePlayerRemoval(socket.id);
            if (!playerRemoved) {
                console.log(`This user was not active in a single room.`);
                return;
            }
            const { newRooms, newRoom } = playerRemoved;
            console.log(
                `This user has been removed from room with ID ${newRoom.id}.`,
            );
            setRooms(newRooms);
            if (!newRoom) {
                console.log(
                    `This user was the last user in it's room, the room was removed.`,
                );
                return;
            }
            emitRoomToRoom(newRoom.id, io);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('disconnect', onDisconnect);
};
