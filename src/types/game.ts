export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = readonly Cell[];

export type GameResult =
  | { status: "playing"; winner: null; winningLine: null }
  | { status: "won"; winner: Player; winningLine: readonly number[] }
  | { status: "draw"; winner: null; winningLine: null };

export interface Move {
  player: Player;
  cell: number;
}

export interface Scores {
  X: number;
  O: number;
  draws: number;
  total: number;
}
