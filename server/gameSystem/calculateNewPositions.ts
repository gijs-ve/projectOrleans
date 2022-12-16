import { Room } from '../../types/types';
import { generateSpawnTable } from './generateSpawnTable';
import { providePositions } from './providePositions';
export const calculateNewPositions = (room: Room) => {
    if (room.round === 1) {
        const spawnTable = generateSpawnTable(room.arena, room.size, false);
        const newPlayers = providePositions(spawnTable, room.players);
    }
};
