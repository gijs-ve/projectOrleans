import { Rooms, Room, Data } from '../../types/types';
const emitToRoom = (rooms: Rooms, roomId: string, data: Data, io) => {
    rooms.map((i: Room) => {
        if (i.id === roomId) {
            i.players.map((i) => {
                io.to(i.id).emit('sendRoom', data);
            });
        }
        return;
    });
};

export { emitToRoom };
