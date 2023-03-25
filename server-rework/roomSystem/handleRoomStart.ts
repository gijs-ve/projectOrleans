import { Player, Room, Rooms } from '../../types/types';
import store, { setRoom } from 'store';

import { fillArena } from 'gameSystem';
import { findRoomById } from '.';

export const handleRoomStart = (roomId: string) => {
    const { rooms } = store.getState().roomState;
    if (rooms.length === 0) return;
    const startedRoom = findRoomById(roomId);
    startedRoom.phase = 'Preparing';
    startedRoom.timer = 5;
    startedRoom.round = 1;
    2;
    const filledRoom = fillArena(startedRoom);
    setRoom(filledRoom);
};
