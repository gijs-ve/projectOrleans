import { Room, Rooms } from '../../types/types';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { generateNewRooms } from './generateNewRooms';

const initialState: { rooms: Rooms } = {
    rooms: [],
};
const roomSlice = createSlice({
    name: 'roomState',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        addRoom: (state, action: { payload: Room }) => {
            console.log('PAYLOAD', action.payload);
            state.rooms = [...state.rooms, action.payload];
        },
        startRoom: (state, action: { payload: string }) => {
            const { payload } = action;
            const { rooms } = state;
            const startedRoom = rooms.find((i: Room) => i.id === payload);
            startedRoom.phase = 'Preparing';
            startedRoom.timer = 5;
            startedRoom.round = 1;
            state.rooms = generateNewRooms(rooms, startedRoom);
        },
        setRoom: (state, action: { payload: Room }) => {
            const { payload } = action;
            const { rooms } = state;
            const newRooms = generateNewRooms(rooms, payload);
            state.rooms = newRooms;
        },
    },
});

const store = configureStore({
    reducer: {
        roomState: roomSlice.reducer,
    },
});
export * from './generateNewRooms';
export const { setRooms, addRoom, startRoom, setRoom } = roomSlice.actions;
export default store;
