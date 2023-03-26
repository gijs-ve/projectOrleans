import { Square } from '../../types/types';

export const arrayContainsSquare = (array: Square[], square: Square) => {
    const foundSquare = array.find((i: Square) => {
        if (i.x === square.x && i.y === square.y) return true;
        return false;
    });
    if (!foundSquare) return false;
    return true;
};
