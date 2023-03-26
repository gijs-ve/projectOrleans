import { Room, Rooms } from '../../types/types';
export const socketIdIsHost = (
    rooms: Rooms,
    roomId: string,
    socketId: string,
) => {
    //find the room first that is requested
    const room = rooms.find((i: Room) => {
        return i.id === roomId;
    });
    //return true or false whether the hostId is equal to the socketId
    return room.hostId === socketId;
};
