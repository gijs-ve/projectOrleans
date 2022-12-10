export type GameState =
    | { phase: 'Pregame' }
    | { phase: 'Preparing' }
    | { phase: 'InGame'; currentPlayer: number };

export type Player = { name: string; id: string };
export type TurnTable = number[];
export type Room = { name: string; id: string; players: Player[] };

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
