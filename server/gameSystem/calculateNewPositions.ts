import { Room } from '../../types/types';
import { generateSpawnTable } from './generateSpawnTable';
import { getSpawnPosition } from './getSpawnPosition';
export const calculateNewPositions = (room: Room) => {
    let newRoom = room;
    if (room.round === 1) {
        const spawnTable = generateSpawnTable(room.arena, room.size, false);
        const newPlayers = getSpawnPosition(spawnTable, room.players);
        newRoom.players = newPlayers;
        return newRoom;
    }
};
