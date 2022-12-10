export type GameState =
    | { phase: 'Pregame' }
    | { phase: 'Preparing' }
    | { phase: 'InGame'; currentPlayer: number };

type PlayerId = number;
export type Player = { name: string; id: string; playerId: PlayerId };
export type TurnTable = number[];

type X = number[];
type Y = X[];
export type grid = Y;

export type FilledSquare = { x: number; y: number; playerId: PlayerId };
export type Room = {
    name: string;
    id: string;
    players: Player[];
    grid: grid;
    filledSquares: FilledSquare[];
};

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
