//Gamestates
export type GameState =
    | { phase: 'Pregame' }
    | { phase: 'Preparing' }
    | { phase: 'InGame' };

//Players
type PlayerId = number | null;
export type Player = { name: string; id: string; playerId: PlayerId };

//Room
export type Arena = null | {
    name: string;
    round: number;
    grid: Square[];
};
export type Square = { x: number; y: number; playerId: PlayerId | null };

export type Game = {
    id: string;
    players: Player[];
    state: GameState;
    arena: Arena;
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

//Client related
export type State = {
    connected: boolean;
    error: string | null;
    playerIx: number | null;
    game: Game | null;
};

//Server related
export type Rooms = Game[] | [];
interface SocketData {
    playerIx: number;
}
