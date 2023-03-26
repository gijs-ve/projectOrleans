import { Players, Player } from "../../types/types";

//takes a list of players, returns the amount of players alive
export const getPlayersAliveCount = (players: Players): number => {
    const alivePlayers = players.filter((i: Player) => {
        return (i.isAlive)
    })
    return alivePlayers.length
}