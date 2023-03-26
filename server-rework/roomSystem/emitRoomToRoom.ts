import { Data, Player, Room, Rooms } from '../../types/types';

import store from '../store';

const emitRoomToRoom = (roomId: string, io): void => {
    const { rooms } = store.getState().roomState;
    rooms.map((room: Room) => {
        console.log(room.players);
        if (room.id === roomId) {
            room.players.map((player: Player) => {
                io.to(player.id).emit('sendRoom', { room });
            });
        }
        return;
    });
};

export { emitRoomToRoom };
