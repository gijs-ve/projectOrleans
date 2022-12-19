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
                position: null,
                direction: null,
                isAlive: false,
                isSpectator: false,
            },
        ],
        phase: 'PreGame',
        arena: null,
        filledSquares: [],
        timer: null,
        round: 0,
        maxRounds: 0,
        timelines: 3,
        timelineTime: 30,
        size: 25,
    };
    return { newRooms: [...rooms, room], newRoom: room };
};
