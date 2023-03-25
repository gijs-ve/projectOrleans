import { Players, Square } from '../../types/types';
import { arrayContainsSquare } from './arrayContainsSquare';
import { calculateNeighbours } from './calculateNeighbours';
import { getRandomDirection } from './getRandomDirection';

//takes a spawnTable and a playersTable, returns a new playersTable with spawn positions included
export const providePositions = (spawnTable: Square[], players: Players) => {
    const playerCount = players.length;
    const newPlayers = players;
    let newSpawnTable = spawnTable;
    console.log('TEST1', newPlayers);
    for (let d = 0; d < playerCount; d++) {
        const spawnPosition =
            newSpawnTable[Math.floor(Math.random() * newSpawnTable.length)];
        console.log('TEST2');
        newPlayers[d].playerId = d;
        newPlayers[d].position = spawnPosition;
        newPlayers[d].isAlive = true;
        console.log('TEST3');
        newPlayers[d].direction = getRandomDirection();
        console.log('TEST4');
        const surroundingArray = calculateNeighbours(spawnPosition);
        newSpawnTable = newSpawnTable.filter((i: Square) => {
            if (arrayContainsSquare(surroundingArray, i)) return false;
            if (spawnPosition === i) return false;
            return true;
        });
    }
    return newPlayers;
};
