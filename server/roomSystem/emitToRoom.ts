import { Rooms, Room, Data } from '../../types/types';
const emitToRoom = (rooms: Rooms, roomId, data: Data, io) => {
    rooms.map((i: Room) => {
        if (i.id === roomId) {
            i.players.map((i) => {
                console.log('HERE', i);
                io.to(i.id).emit('sendRoom', data);
            });
        }
        return;
    });
};

export { emitToRoom };
