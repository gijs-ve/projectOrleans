import { Arena, Square } from '../../types/types';

export const squareIsSolid = (
    square: Square,
    roomSize: number,
    filledSquares: Arena,
): boolean => {
    if (
        square.x >= roomSize+1 ||
        square.y >= roomSize+1 ||
        square.x <= 0 ||
        square.y <= 0
    )
        return true;
    const jsonSquares = filledSquares.map((i: Square) => {
        return JSON.stringify(i);
    });
    if (jsonSquares.includes(JSON.stringify(square))) return true;
    return false;
};
