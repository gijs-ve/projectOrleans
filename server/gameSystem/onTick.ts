import { Room, Rooms, Player, Arena } from '../../types/types';
import { getNextSquare } from './getNextSquare';
import { squareIsSolid } from './squareIsSolid';

//Handles events that occur every tick
export const onTick = (rooms: Rooms): Rooms => {
    return rooms.map((room: Room) => {
        switch (room.phase) {
            case 'PreGame':
                return room;
            case 'Preparing':
                if (room.timer >= 1) return { ...room, timer: room.timer - 1 };
                if (room.timer <= 0)
                    return {
                        ...room,
                        phase: 'InGame',
                        timer: room.timelineTime,
                    };
            case 'InGame':
                if (room.timer >= 0) {
                    let filledSquares: Arena = room.filledSquares;
                    const newPlayers = room.players.map((player: Player) => {
                        if (player.isSpectator) return player;
                        if (!player.isAlive) return player;
                        filledSquares = [
                            ...filledSquares,
                            { ...player.position, playerId: player.playerId },
                        ];
                        if (
                            !squareIsSolid(
                                getNextSquare(player),
                                room.size,
                                room.filledSquares,
                            )
                        ) {
                            return {
                                ...player,
                                position: getNextSquare(player),
                            };
                        }
                        return { ...player, isAlive: false };
                    });
                    return {
                        ...room,
                        players: newPlayers,
                        timer: room.timer - 1,
                        filledSquares: filledSquares,
                    };
                }
            default:
                return room;
        }
    });
};
