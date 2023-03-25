import { Room } from '../../types/types';
import { generateSpawnTable } from './generateSpawnTable';
import { providePositions } from './providePositions';
export const calculateNewPositions = (room: Room): Room => {
    let newRoom = room;
    console.log('CALCULATE NEW POSITIONS', room);
    if (room.round === 1) {
        const spawnTable = generateSpawnTable(room.arena, room.size, false);
        console.log('generateSpawnTable', spawnTable);
        const newPlayers = providePositions(spawnTable, room.players);
        console.log('newPlayers', newPlayers);
        newRoom.players = newPlayers;
        return newRoom;
    }
};
