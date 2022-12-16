import { Square } from '../../types/types';

export const arrayContainsSquare = (array: Square[], square: Square) => {
    const foundSquare = array.find((i: Square) => {
        return i === square;
    });
    if (!foundSquare) return false;
    return true;
};
