import { IO } from 'functions/helpers/createServer';
import { Socket } from 'socket.io';
import { handleRoomCreation } from '../roomSystem';
module.exports = (io: IO, socket: Socket) => {
    const createRoom = (data: any) => {
        try {
            const { playerName } = data;
            console.log(`User ${playerName} ${socket.id} created a room`);
            handleRoomCreation(playerName, socket.id);

            const sendData: Data = { room: newRoom };
            socket.emit('sendRoom', sendData);
        } catch (error) {
            console.log(error);
        }
    };
    socket.on('createRoom', createRoom);
};
