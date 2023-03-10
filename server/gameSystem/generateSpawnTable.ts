//Generates all possible spawn tables based on room size and known spawn locations
import { Arena, Square } from '../../types/types';
export const generateSpawnTable = (
    arena: Arena,
    roomSize: number,
    spawnTable: Square[] | false,
) => {
    if (!spawnTable || spawnTable.length === 0) {
        const newSpawnTable = arena.filter((i: Square) => {
            return (
                i.x >= 2 &&
                i.y >= 2 &&
                i.x <= roomSize - 1 &&
                i.y <= roomSize - 1
            );
        });
        return newSpawnTable;
    }
};
