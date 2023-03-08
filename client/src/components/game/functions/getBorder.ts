import { Square } from '../../../../../types/types';

export const getBorder = (roomSize: number): Square[] => {
    const border: Square[] = [];
    for (let i = 0; i < roomSize + 2; i++) {
        border.push({ x: i, y: 0, z: 0 });
        border.push({ x: 0, y: 0, z: i });
        border.push({ x: i, y: 0, z: roomSize + 1 });
        border.push({ x: roomSize + 1, y: 0, z: i });
    }
    return border;
};
