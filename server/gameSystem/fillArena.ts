import { generateNewRooms } from '../roomSystem';
import { Room, Rooms, Arena } from '../../types/types';

//Fills the arena at the start of a round
export const fillArena = (rooms: Rooms, room: Room) => {
    const newRoom = room;
    const arenaSize = room.size;
    const arena: Arena = [];
    for (let x = 1; x < arenaSize + 1; x++) {
        for (let y = 1; y < arenaSize + 1; y++) {
            const square = { x, y };
            arena.push(square);
        }
    }
    console.log(arena);
    newRoom.arena = arena;
    const newRooms = generateNewRooms(rooms, newRoom);
    return { newRooms, newRoom };
};
