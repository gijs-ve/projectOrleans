import { Arena, Square } from '../../types/types';

export const squareIsSolid = (
    square: Square,
    roomSize: number,
    filledSquares: Arena,
): boolean => {
    if (
        square.x >= roomSize + 1 ||
        square.y >= roomSize + 1 ||
        square.x <= 0 ||
        square.y <= 0
    ) {
        return true;
    }
    const stringSquares = filledSquares.map((i: Square) => {
        return `X${i.x}Y${i.y}`;
    });
    if (stringSquares.includes(`X${square.x}Y${square.y}`)) {
        return true;
    }
    return false;
};
