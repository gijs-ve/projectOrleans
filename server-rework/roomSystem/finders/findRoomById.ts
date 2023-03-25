import { Room, Rooms } from '../../../types/types';

import store from 'store';

export const findRoomById = (roomId: string) => {
    const { rooms } = store.getState().roomState;
    return rooms.find((i: Room) => i.id === roomId);
};
