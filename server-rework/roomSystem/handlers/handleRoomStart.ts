import { Player, Room, Rooms } from '../../../types/types';
import store, { setRoom } from '../../store';

import { fillArena } from '../../gameSystem';
import { findRoomById } from '..';

export const handleRoomStart = (roomId: string) => {
    const { rooms } = store.getState().roomState;
    if (rooms.length === 0) return;
    const startedRoom = {
        ...findRoomById(roomId),
        phase: 'Preparing',
        timer: 5,
        round: 1,
    };
    const filledRoom = fillArena(startedRoom);
    store.dispatch(setRoom(filledRoom));
};
