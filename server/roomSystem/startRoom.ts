import { Player, Room, Rooms } from '../../types/types';
import { findRoomById, generateNewRooms } from '.';
import { getStartPositions } from '../gameSystem';
export const startRoom = (rooms: Rooms, roomId: string) => {
    if (rooms.length === 0) return;
    const startedRoom = getStartPositions(findRoomById(rooms, roomId));
    startedRoom.phase = 'Preparing';
    startedRoom.timer = 5;
    startedRoom.round = 1;
    const startedRooms = generateNewRooms(rooms, startedRoom);
    return { startedRooms, startedRoom };
};
