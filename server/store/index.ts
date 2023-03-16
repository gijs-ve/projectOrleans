import { configureStore, createSlice } from '@reduxjs/toolkit';
import { QuizPhase, Room, RoomState, Stage } from '../../globalTypes/types';
const initialState: RoomState = {
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
        setStageOfRoom: (
            state,
            action: { payload: { roomId: string; stage: Stage } },
        ) => {
            const { roomId, stage } = action.payload;
            const foundRoom = state.rooms.find(
                (room: Room) => room.id === roomId,
            );
            const newRoom = {
                ...foundRoom,
                currentSectionId: stage.sectionId,
                currentModuleId: stage.moduleId,
                quizPhase: stage.phase,
            };
            state.rooms = state.rooms.map((room: Room) => {
                if (room.id === roomId) {
                    return newRoom;
                }
                return room;
            });
        },
        setPhaseOfRoom: (
            state,
            action: { payload: { roomId: string; phase: QuizPhase } },
        ) => {
            const { roomId, phase } = action.payload;
            const newRoom = {
                ...state.rooms.find((room: Room) => room.id === roomId),
                quizPhase: phase,
            };
            state.rooms = state.rooms.map((room: Room) => {
                if (room.id === roomId) {
                    return newRoom;
                }
                return room;
            });
        },
    },
});

const store = configureStore({
    reducer: {
        roomState: roomSlice.reducer,
    },
});

export const { setRooms, addRoom, setStageOfRoom, setPhaseOfRoom } =
    roomSlice.actions;
export default store;
