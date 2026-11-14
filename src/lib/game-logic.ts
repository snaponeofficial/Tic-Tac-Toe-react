import { WINNING_COMBINATIONS } from "@/lib/constants";
import type { Board, Cell, GameResult, Player } from "@/types/game";

export const createBoard = (): Board => Array<Cell>(9).fill(null);

export function getWinningLine(board: Board): readonly number[] | null {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return line;
  }
  return null;
}

export function evaluateBoard(board: Board): GameResult {
  const winningLine = getWinningLine(board);
  if (winningLine) {
    return { status: "won", winner: board[winningLine[0]] as Player, winningLine };
  }
  if (board.every(Boolean)) return { status: "draw", winner: null, winningLine: null };
  return { status: "playing", winner: null, winningLine: null };
}

export const isValidMove = (board: Board, cell: number, result = evaluateBoard(board)) =>
  Number.isInteger(cell) && cell >= 0 && cell < 9 && board[cell] === null && result.status === "playing";

export const switchPlayer = (player: Player): Player => (player === "X" ? "O" : "X");

export function placeMark(board: Board, cell: number, player: Player): Board {
  if (!isValidMove(board, cell)) return board;
  const next = [...board];
  next[cell] = player;
  return next;
}
