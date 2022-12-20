import { Rooms, Room, Player, Game } from '../../types/types';
import { roomHasSocketId } from './roomHasSocketId';
import { socketIdIsHost } from './socketIdIsHost';
import { getNewHost } from './getNewHost';

export const removePlayerFromRoom = (
    rooms: Rooms,
    socketId: string,
): { newRooms: Rooms; newRoom: Game | null } => {
    const roomWithPlayer = rooms.find((i: Room) =>
        roomHasSocketId(i, socketId),
    );
    //If player is not in a room return null
    if (!roomWithPlayer) return null;
    const newPlayers = roomWithPlayer.players.filter((i: Player) => {
        if (i.id === socketId) return false;
        return true;
    });
    //If player is last player return empty room
    if (roomWithPlayer.players.length === 0) {
        const newRooms = rooms.filter((i: Room) => {
            if (i.id === roomWithPlayer.id) return false;
            return true;
        });
        return { newRooms, newRoom: null };
    }
    const newHostId = socketIdIsHost(rooms, roomWithPlayer.id, socketId)
        ? getNewHost(roomWithPlayer, socketId)
        : roomWithPlayer.hostId;
    const newRoom = {
        ...roomWithPlayer,
        players: newPlayers,
        hostId: newHostId,
    };
    const newRooms = rooms.map((i: Room) => {
        if (i.id === roomWithPlayer.id) return newRoom;
        return i;
    });
    return { newRooms, newRoom };
};
