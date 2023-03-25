import { Player, Room, Rooms } from '../../../types/types';
import store, { setRoom } from '../../store';
export const handlePlayerJoin = (
    roomId: string,
    playerName: string,
    socketId: string,
): void => {
    const { rooms } = store.getState().roomState;
    if (rooms.length === 0) return;
    const newPlayer: Player = {
        name: playerName,
        id: socketId,
        playerId: null,
        position: null,
        direction: null,
        isAlive: false,
        isSpectator: false,
    };
    const room = rooms.find((i: Room) => i.id === roomId);
    const newPlayers = [...room.players, newPlayer];
    const newRoom = { ...room, players: newPlayers };
    setRoom(newRoom);
};
