import { Player, Room, Rooms } from '../../types/types';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { generateNewRooms } from './generateNewRooms';
import { findRoomById, findRoomBySocketId } from '../roomSystem';

const initialState: { rooms: Rooms } = {
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
            console.log('action', payload);
            const { rooms } = state;
            const newRooms = generateNewRooms(rooms, payload);
            console.log('NEWROOMS SETROOM', newRooms);
            state.rooms = newRooms;
        },
        setPlayer: (state, action: { payload: Player }) => {
            const { payload } = action;
            const { rooms } = state;
            const foundRoom = findRoomBySocketId(payload.id);
            const newPlayers = foundRoom.players.map((player: Player) => {
                if (player.id === payload.id) {
                    return payload;
                }
                return player;
            });
            const newRoom: Room = { ...foundRoom, players: newPlayers };
            state.rooms = generateNewRooms(rooms, newRoom);
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
