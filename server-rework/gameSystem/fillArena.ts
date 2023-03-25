import { Arena, Room, Rooms, Square } from '../../types/types';
import store, { generateNewRooms } from '../store';

import { findRoomById } from 'roomSystem';

//Fills the arena at the start of a round
export const fillArena = (room: Room): Room => {
    const arenaSize = room.size;
    const newArena: Arena = [{ x: 0, y: 0 }];
    for (let x = 1; x < arenaSize + 1; x++) {
        for (let y = 1; y < arenaSize + 1; y++) {
            const square: Square = { x, y };
            newArena.push(square);
        }
    }
    room.arena = newArena;
    return room;
};
