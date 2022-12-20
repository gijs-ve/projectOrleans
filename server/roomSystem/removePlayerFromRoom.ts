import { Rooms, Room, Player } from '../../types/types';
import { roomHasSocketId } from './roomHasSocketId';

export const removePlayerFromRoom = (rooms: Rooms, socketId: string) => {
    const roomWithPlayer = rooms.find((i: Room) =>
        roomHasSocketId(i, socketId),
    );
    if (!roomWithPlayer) return null;
    const newPlayers = roomWithPlayer.players.filter((i: Player) => {
        if (i.id === socketId) return false;
        return true;
    });
    const newRoom = { ...roomWithPlayer, players: newPlayers };
    const newRooms = rooms.map((i: Room) => {
        if (i.id === roomWithPlayer.id) return newRoom;
        return i;
    });
    return { newRooms, newRoom };
};
