import { Square } from '../../../../types/types';

export const getEdges = (roomSize: number): Square[] => {
    const array: Square[] = [];
    for (let i = 0; i < roomSize + 2; i++) {
        array.push({ x: i, y: 0 });
        array.push({ x: 0, y: i });
        array.push({ x: i, y: roomSize + 1 });
        array.push({ x: roomSize + 1, y: i });
    }
    return array;
};
