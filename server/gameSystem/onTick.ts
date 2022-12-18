import { Room, Rooms, Player } from '../../types/types';
import { getNextSquare } from './getNextSquare';

export const onTick = (rooms: Rooms): Rooms => {
    return rooms.map((i: Room) => {
        switch (i.phase) {
            case 'PreGame':
                return i;
            case 'Preparing':
                if (i.timer >= 1) return { ...i, timer: i.timer - 1 };
                if (i.timer <= 0)
                    return { ...i, phase: 'InGame', timer: i.timelineTime };
            case 'InGame':
                if (i.timer >= 0) {
                    const newPlayers = i.players.map((i: Player) => {
                        return { ...i, position: getNextSquare(i) };
                    });
                    return { ...i, players: newPlayers, timer: i.timer - 1 };
                }
        }
    });
};
