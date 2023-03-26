import { Player, Players, Square } from '../../types/types';
import { arrayContainsSquare } from './arrayContainsSquare';
import { calculateNeighbours } from './calculateNeighbours';
import { getRandomDirection } from './getRandomDirection';

//takes a spawnTable and a playersTable, returns a new playersTable with spawn positions included
export const getSpawnPosition = (spawnTable: Square[], players: Players) => {
    const playerCount = players.length;
    let newPlayers = players.map((player: Player) => {
        return player;
    });
    let newSpawnTable = spawnTable;
    for (let d = 0; d < playerCount; d++) {
        const spawnPosition =
            newSpawnTable[Math.floor(Math.random() * newSpawnTable.length)];
        newPlayers = newPlayers.map((player: Player, index: number) => {
            console.log('d', d);
            console.log('index', index);
            if (index !== d) return player;
            return {
                ...player,
                playerId: d,
                position: spawnPosition,
                isAlive: true,
                direction: getRandomDirection(),
            };
        });
        console.log(`NEWPLAYERS AT ${d}`, newPlayers);
        const surroundingArray = calculateNeighbours(spawnPosition);
        newSpawnTable = newSpawnTable.filter((square: Square) => {
            if (arrayContainsSquare(surroundingArray, square)) return false;
            if (spawnPosition === square) return false;
            return true;
        });
    }
    return newPlayers;
};
