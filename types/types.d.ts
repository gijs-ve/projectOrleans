//Gamestates
export type GameState =
    | { phase: 'Pregame' }
    | { phase: 'Preparing' }
    | { phase: 'InGame' };

//Players
type PlayerId = number;
export type Player = { name: string; id: string; playerId: PlayerId };

//Room
export type Room = null | {
    name: string;
    id: string;
    players: Player[];
    grid: FilledSquare[];
};
export type FilledSquare = { x: number; y: number; playerId: PlayerId | null };

export type Game = {
    id: string;
    players: Player[];
    state: GameState;
};

interface ServerToClientEvents {
    error: (error: string) => void;
    receiveIx: (ix: number) => void;
    game: (game: Game) => void;
}

interface ClientToServerEvents {
    register: (gameId: string) => void;
    start: (gameId: string) => void;
    roll: (gameId: string) => void;
    makeBid: (gameId: string) => void;
}
