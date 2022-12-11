import { Game, Rooms } from '../../types/types';
const { v4: uuidv4 } = require('uuid');
export const createRoom = (rooms: Rooms, hostName: string, hostId: string) => {
    const room: Game = {
        id: uuidv4().split('-')[0],
        hostId,
        players: [
            {
                name: hostName,
                id: hostId,
                playerId: null,
                direction: null,
                isSpectator: false,
            },
        ],
        phase: 'PreGame',
        arena: null,
    };
    return { newRooms: [...rooms, room], newRoom: room };
};