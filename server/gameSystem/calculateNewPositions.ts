import { Room } from '../../types/types';
import { generateSpawnTable } from './generateSpawnTable';
export const calculateNewPositions = (room: Room) => {
    if (room.round === 1) {
        console.log('5 ROOM', room);
        return generateSpawnTable(room.arena, room.size, false);
    }
};
