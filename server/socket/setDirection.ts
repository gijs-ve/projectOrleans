import { IO } from './createServer';
import { KeyDirection } from '../../types/types';
import { Socket } from 'socket.io';
import { emitRoomToRoom } from '../roomSystem';
import { setPlayerDirection } from '../gameSystem';

//Changes direction of a player
module.exports = (io: IO, socket: Socket) => {
    const setDirection = (data: {
        roomId: string;
        keyDirection: KeyDirection;
    }): void => {
        try {
            const { roomId, keyDirection } = data;
            console.log(keyDirection);
            if (!roomId || !keyDirection) return;
            setPlayerDirection(roomId, socket.id, keyDirection);
            emitRoomToRoom(roomId, io);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('setDirection', setDirection);
};
