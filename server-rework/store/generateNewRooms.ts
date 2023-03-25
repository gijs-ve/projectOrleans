import { Room, Rooms } from '../../types/types';
export const generateNewRooms = (rooms: Rooms, newRoom: Room) => {
    return rooms.map((i: Room) => {
        if (i.id === newRoom.id) return newRoom;
        return i;
    });
};
