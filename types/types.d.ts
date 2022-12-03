type GameState =
    | { state: 'Pregame' }
    | { state: 'Preparing' }
    | { state: 'InGame'; currentPlayer: number };

type Player = { name: string; id: string };
type Room = { name: string; id: string };
