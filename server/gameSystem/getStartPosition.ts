import { calculateNewPositions } from '../gameSystem';
import { Room } from '../../types/types';

export const getStartPositions = (room: Room) => {
    const newRoom = calculateNewPositions(room);
    newRoom.phase = 'Preparing';
    return newRoom;
};
