import { Direction, Player, Rooms, Room } from '../../types/types';

export const setPlayerDirection = (
    rooms: Rooms,
    roomId: string,
    socketId: string,
    newDirection: Direction,
) => {
    return rooms.map((i: Room) => {
        if (i.id !== roomId) return i;
        return {
            ...i,
            players: i.players.map((i: Player) => {
                if (i.id !== socketId) return i;
                if (
                    (i.direction === 'Up' && newDirection === 'Down') ||
                    (i.direction === 'Down' && newDirection === 'Up') ||
                    (i.direction === 'Left' && newDirection === 'Right') ||
                    (i.direction === 'Right' && newDirection === 'Left')
                )
                    return i;
                return { ...i, direction: newDirection };
            }),
        };
    });
};
