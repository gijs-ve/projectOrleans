import { Player, Room, Rooms } from '../../types/types';
import { findRoomById, generateNewRooms } from '.';
export const startRoom = (rooms: Rooms, roomId: string) => {
    if (rooms.length === 0) return;
    const newRoom = findRoomById(rooms, roomId);
    newRoom.phase = 'Preparing';
    newRoom.timer = 5;
    newRoom.round = 1;
    const newRooms = generateNewRooms(rooms, newRoom);
    return { newRooms, newRoom };
};
