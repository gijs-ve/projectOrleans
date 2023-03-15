import { Arena, Player, Room, Rooms } from '../../types/types';

import { getNextSquare } from './getNextSquare';
import { squareIsSolid } from './squareIsSolid';

//Handles events that occur every tick
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
                    let filledSquares: Arena = i.filledSquares;
                    const newPlayers = i.players.map((j: Player) => {
                        if (j.isSpectator) return j;
                        if (!j.isAlive) return j;
                        filledSquares = [
                            ...filledSquares,
                            { ...j.position, playerId: j.playerId },
                        ];
                        if (
                            !squareIsSolid(
                                getNextSquare(j),
                                i.size,
                                i.filledSquares,
                            )
                        ) {
                            console.log('NEXT SQUARE', getNextSquare(j));
                            return { ...j, position: getNextSquare(j) };
                        }
                        return { ...j, isAlive: false };
                    });
                    return {
                        ...i,
                        players: newPlayers,
                        timer: i.timer - 1,
                        filledSquares: filledSquares,
                    };
                }
            default:
                return i;
        }
    });
};
