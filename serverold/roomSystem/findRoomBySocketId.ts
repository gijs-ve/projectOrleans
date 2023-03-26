import { Room } from "../../types/types"
import { roomHasSocketId } from "./roomHasSocketId"
//return the room the socketId is in that is provided
export const findRoomBySocketId = (rooms, socketId) => {
    return rooms.map((i: Room) => {
        return (roomHasSocketId(i, socketId))
    })
}