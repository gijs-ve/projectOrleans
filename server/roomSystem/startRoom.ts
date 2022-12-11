import { Player, Room, Rooms } from '../../types/types';
import { findRoomById, generateNewRooms } from '.';
export const startRoom = (rooms: Rooms, roomId: string) => {
    if (rooms.length === 0) return;
    const startedRoom = findRoomById(rooms, roomId);
    startedRoom.phase = 'Preparing';
    startedRoom.timer = 5;
    startedRoom.round = 1;
    const startedRooms = generateNewRooms(rooms, startedRoom);
    return { startedRooms, startedRoom };
};
