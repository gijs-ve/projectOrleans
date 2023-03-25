import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Rooms, Room } from '../../types/types';
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
    },
});

const store = configureStore({
    reducer: {
        roomState: roomSlice.reducer,
    },
});

export const { setRooms, addRoom } = roomSlice.actions;
export default store;
