export type GameState =
    | { state: 'Pregame' }
    | { state: 'Preparing' }
    | { state: 'InGame'; currentPlayer: number };

export type Player = { name: string; id: string };
export type TurnTable = number[];
export type Room = { name: string; id: string; players: Player[] };
