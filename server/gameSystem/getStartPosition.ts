import { calculateNewPositions } from '../gameSystem';
import { getPlayersFromRoom } from '../roomSystem/getPlayersFromRoom';
import { Room } from '../../types/types';

export const getStartPositions = (room: Room) => {
    console.log(room);
    const players = getPlayersFromRoom(room);
    calculateNewPositions(room);
    return room;
};
