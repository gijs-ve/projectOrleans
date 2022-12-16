import { Square } from '../../types/types';

//return an array with the 8 surrounding squares of a square, when not at edge
export const calculateNeighbours = (square: Square): Square[] => {
    return [
        { x: square.x - 1, y: square.y - 1 },
        { x: square.x, y: square.y - 1 },
        { x: square.x + 1, y: square.y - 1 },
        { x: square.x - 1, y: square.y },
        { x: square.x + 1, y: square.y },
        { x: square.x - 1, y: square.y + 1 },
        { x: square.x, y: square.y + 1 },
        { x: square.x + 1, y: square.y + 1 },
    ];
};
