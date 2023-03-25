import { Room } from '../../types/types';
import { roomHasSocketId } from './roomHasSocketId';
import store from 'store';

//return the room the socketId is in that is provided
export const findRoomBySocketId = (socketId: string): Room => {
    const { rooms } = store.getState().roomState;
    return rooms.find((i: Room) => {
        return roomHasSocketId(i, socketId);
    });
};
