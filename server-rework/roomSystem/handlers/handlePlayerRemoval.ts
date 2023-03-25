import { Game, Player, Room, Rooms } from '../../../types/types';

import { handleNewHost } from './handleNewHost';
import { roomHasSocketId } from '../roomHasSocketId';
import { socketIdIsHost } from '../socketIdIsHost';
import store from 'store';

export const handlePlayerRemoval = (
    socketId: string,
): { newRooms: Rooms; newRoom: Game | null } | null => {
    const { rooms } = store.getState().roomState;
    const roomWithPlayer = rooms.find((i: Room) => {
        return roomHasSocketId(i, socketId);
    });
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
        ? handleNewHost(roomWithPlayer, socketId)
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
