import { configureStore, createSlice } from '@reduxjs/toolkit';

import { Room } from '../../types/types';

const initialState: { rooms: Room[] | [] } = {
    rooms: [],
};
const roomSlice = createSlice({
    name: 'roomState',
    initialState,
    reducers: {
        setRooms: (state, action: { payload: Room[] }) => {
            state.rooms = action.payload;
        },
        addRoom: (state, action: { payload: Room }) => {
            state.rooms = [...state.rooms, action.payload];
        },
    },
});

const store = configureStore({
    reducer: {
        roomState: roomSlice.reducer,
    },
});

export const { setRooms, addRoom } = roomSlice.actions;
export default store;
