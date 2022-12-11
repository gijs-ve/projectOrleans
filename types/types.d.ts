////Client & server shared types////
//Gamestates
export type GamePhase = 'PreGame' | 'Preparing' | 'InGame';

//Players
type PlayerId = number | null;
export type Player = {
    name: string;
    id: string;
    playerId: PlayerId;
    position: Square | null;
    direction: number | null;
    isSpectator: boolean;
};
type Players = Player[];

//Arena
export type Arena = Square[] | [];
export type Square = { x: number; y: number; playerId?: PlayerId };

//Game and room related
export type Game = {
    id: string;
    hostId: string;
    players: Players;
    phase: GamePhase;
    arena: Arena;
    size: number;
    round: number;
    maxRounds: number;
    timer: number | null;
};
export type Room = Game;

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
export type Data = {
    newRoom?: Room;
    playerName?: string;
    roomId?: string;
    room?: Game;
};

////End Client & server shared types////

////Client related types////
export type State = {
    connected: boolean;
    error: string | null;
    playerIx: number | null;
    game: Game | null;
};
export type RawState = {
    gameState: {
        connected: boolean;
        error: string | null;
        playerIx: number | null;
        game: Game | null;
    };
};

//Actions
export type Action =
    | { type: 'SET_CONNECTED' }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'IX_RECEIVED'; ix: number }
    | { type: 'GAME_RECEIVED'; game: Game }
    | { type: 'PHASE_CHANGE'; phase: GamePhase }
    | { type: 'ARENA_RECEIVED'; arena: Game | any }
    | { type: 'SQUARE_RECEIVED'; square: Square };

//Props
export type GameProp = {
    game: Game;
    className?: string;
};

export type CanvasProp = {
    game: Game;
    className?: string;
    height: number;
    width: number;
};
export type NameProp = {
    name: string;
};

export type RoomProp = {
    roomId?: string;
    hostId?: string;
};

export type PlayersProp = {
    hostId?: string;
    players: Players;
};

export type PlayerProp = {
    key?: string;
    player: Player;
};
////End client related types////

//Server related types////
export type Rooms = Game[] | [];
interface SocketData {
    playerIx: number;
}
////End Server related types////
