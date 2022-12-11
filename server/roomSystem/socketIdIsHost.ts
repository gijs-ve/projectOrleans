import { Room, Rooms } from '../../types/types';
export const socketIdIsHost = (
    rooms: Rooms,
    roomId: string,
    socketId: string,
) => {
    const room = rooms.find((i: Room) => {
        return i.id === roomId;
    });

    return room.hostId === socketId;
};
