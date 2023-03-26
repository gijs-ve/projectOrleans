import { Rooms, Room } from '../../types/types';
export const findRoomById = (rooms: Rooms, roomId: string) => {
    return rooms.find((i: Room) => i.id === roomId);
};
