import { Room } from '../../types/types';
import { generateSpawnTable } from './generateSpawnTable';
export const calculateNewPositions = (room: Room) => {
    if (room.round === 1) {
        console.log('5 ROOM', room);
        const spawnTable = generateSpawnTable(room.arena, room.size, false);
        const playerCount = room.players.length;
    }
};
