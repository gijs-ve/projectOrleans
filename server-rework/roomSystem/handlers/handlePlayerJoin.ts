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
    console.log('newPlayer', newPlayer);
    const room = rooms.find((room: Room) => room.id === roomId);
    console.log('room', room);
    const newPlayers = [...room.players, newPlayer];
    console.log('room', newPlayers);
    const newRoom = { ...room, players: newPlayers };

    store.dispatch(setRoom(newRoom));
};
