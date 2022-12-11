//Gamestates
export type GamePhase = 'Pregame' | 'Preparing' | 'InGame';

//Players
type PlayerId = number | null;
export type Player = {
    name: string;
    id: string;
    playerId: PlayerId;
    direction: number | null;
    isSpectator: boolean;
};

//Arena
export type Arena = null | {
    name: string;
    round: number;
    grid: Square[];
};
export type Square = { x: number; y: number; playerId: PlayerId | null };

//Game and room related
export type Game = {
    id: string;
    players: Player[];
    phase: GamePhase;
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

//socketData
type roomNameData = string;
type roomData = game;
export type Data = {
    roomName?: roomNameData;
    room?: rooMData;
};

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
