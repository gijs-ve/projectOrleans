import { Players, Square } from '../../types/types';
import { arrayContainsSquare } from './arrayContainsSquare';
import { calculateNeighbours } from './calculateNeighbours';

//takes a spawnTable and a playersTable, returns a new playersTable with spawn positions included
export const providePositions = (spawnTable: Square[], players: Players) => {
    const playerCount = players.length;
    const newPlayers = players;
    let newSpawnTable = spawnTable;
    for (let d = 0; d < playerCount; d++) {
        const spawnPosition =
            newSpawnTable[Math.floor(Math.random() * newSpawnTable.length)];
        newPlayers[d].position = spawnPosition;

        console.log(`SPAWN POSITION PROVIDED TO INDEX ${d}`, spawnPosition);
        const surroundingArray = calculateNeighbours(spawnPosition);
        console.log(`OLD SPAWN TABLE ${d}`, newSpawnTable);
        console.log('SURROUND', surroundingArray);
        newSpawnTable = newSpawnTable.filter((i: Square) => {
            console.log('CHECKED SQUARE', i);

            if (arrayContainsSquare(surroundingArray, i)) return false;
            if (spawnPosition === i) return false;
            return true;
        });

        console.log(`newSpawnTable ${d}`, newSpawnTable);
        // newSpawnTable = newSpawnTable.map();
    }
    console.log('newPlayers', newPlayers);
};
