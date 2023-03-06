import { KeyDirection, Player, Rooms, Room } from '../../types/types';

export const setPlayerDirection = (
    rooms: Rooms,
    roomId: string,
    socketId: string,
    keyDirection: KeyDirection,
) => {
    return rooms.map((i: Room) => {
        if (i.id !== roomId) return i;
        return {
            ...i,
            players: i.players.map((i: Player) => {
                if (i.id !== socketId) return i;
                let newDirection = null;
                switch (keyDirection) {
                    case 'Left':
                        switch (i.direction) {
                            case 'Up':
                                newDirection = 'Left';
                                break;
                            case 'Right':
                                newDirection = 'Up';
                                break;
                            case 'Down':
                                newDirection = 'Right';
                                break;
                            case 'Left':
                                newDirection = 'Down';
                                break;
                            default:
                                break;
                        }
                        break;
                    case 'Right':
                        switch (i.direction) {
                            case 'Up':
                                newDirection = 'Right';
                                break;
                            case 'Right':
                                newDirection = 'Down';
                                break;
                            case 'Down':
                                newDirection = 'Left';
                                break;
                            case 'Left':
                                newDirection = 'Up';
                                break;
                            default:
                                break;
                        }
                        break;
                }
                if (!newDirection) return i;
                return { ...i, direction: newDirection };
            }),
        };
    });
};
