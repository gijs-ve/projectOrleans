import { calculateNewPositions } from '../gameSystem';
import { getPlayersFromRoom } from '../roomSystem/getPlayersFromRoom';
import { Room } from '../../types/types';

export const getStartPositions = (room: Room) => {
    const newRoom = calculateNewPositions(room);
    newRoom.phase = 'InGame';
    return newRoom;
};
