import { Player, Room } from '../../../types/types';

//takes a room and returns a new room with the spectator status changed
export const handleSpectatorToggle = (room: Room, socketId: string): Room => {
    const newRoom = room;
    const newPlayer = room.players.find((i: Player) => {
        return i.id === socketId;
    });
    const newPlayers = room.players.map((i: Player) => {
        if (i.id === socketId) {
            return { ...i, isSpectator: !i.isSpectator };
        }
        return i;
    });
    newPlayer.isSpectator = !newPlayer.isSpectator;
    return { ...newRoom, players: newPlayers };
};
