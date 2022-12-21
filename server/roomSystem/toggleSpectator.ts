import { Player, Room } from "../../types/types";
import { getPlayersFromRoom } from "./getPlayersFromRoom";

//takes a room and returns a new room with the spectator status changed
export const toggleSpectator = (room: Room, socketId: string) => {
    const newRoom = room
    const players = getPlayersFromRoom(room)
    const newPlayer = players.find((i: Player) => {
        return (i.id === socketId)
    })
    const newPlayers = players.map((i: Player) => {
        if (i.id === socketId) {
            return {...i, isSpectator: !i.isSpectator}
        }
        return i
    })
    newPlayer.isSpectator = !newPlayer.isSpectator
    return {...newRoom, players: newPlayers}
}