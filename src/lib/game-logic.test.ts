import { describe, expect, it } from "vitest";
import {
  createBoard,
  evaluateBoard,
  getWinningLine,
  isValidMove,
  placeMark,
  switchPlayer,
} from "./game-logic";
import type { Board } from "@/types/game";

describe("game logic", () => {
  it("creates an empty board and switches players", () => {
    expect(createBoard()).toEqual(Array(9).fill(null));
    expect(switchPlayer("X")).toBe("O");
    expect(switchPlayer("O")).toBe("X");
  });

  it.each([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ])("detects winning combination %s-%s-%s for player X", (a, b, c) => {
    const board = Array(9).fill(null) as Board & ("X" | null)[];
    board[a] = board[b] = board[c] = "X";
    expect(getWinningLine(board)).toEqual([a, b, c]);
    expect(evaluateBoard(board)).toEqual({
      status: "won",
      winner: "X",
      winningLine: [a, b, c],
    });
  });

  it.each([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ])("detects winning combination %s-%s-%s for player O", (a, b, c) => {
    const board = Array(9).fill(null) as Board & ("O" | null)[];
    board[a] = board[b] = board[c] = "O";
    expect(getWinningLine(board)).toEqual([a, b, c]);
    expect(evaluateBoard(board)).toEqual({
      status: "won",
      winner: "O",
      winningLine: [a, b, c],
    });
  });

  it("reports a draw only when no winning line exists", () => {
    const draw: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(evaluateBoard(draw)).toEqual({
      status: "draw",
      winner: null,
      winningLine: null,
    });
  });

  it("does not report a draw when the ninth move wins", () => {
    // 9 moves played, X completes diagonal 0-4-8 on the last move
    const finalWinBoard: Board = [
      "X", "O", "O",
      "O", "X", "X",
      "O", "X", "X",
    ];
    const evaluated = evaluateBoard(finalWinBoard);
    expect(evaluated.status).toBe("won");
    expect(evaluated.winner).toBe("X");
    expect(evaluated.winningLine).toEqual([0, 4, 8]);
  });

  it("returns playing for an empty or partially filled board with no winner", () => {
    expect(evaluateBoard(createBoard())).toEqual({
      status: "playing",
      winner: null,
      winningLine: null,
    });

    const partialBoard: Board = ["X", "O", null, null, "X", null, null, null, null];
    expect(evaluateBoard(partialBoard)).toEqual({
      status: "playing",
      winner: null,
      winningLine: null,
    });
  });

  it("getWinningLine returns null for an empty board or no-win board", () => {
    expect(getWinningLine(createBoard())).toBeNull();
    const board: Board = ["X", "O", "X", null, null, null, null, null, null];
    expect(getWinningLine(board)).toBeNull();
  });

  it("rejects occupied, out-of-range, and post-game moves", () => {
    const board: Board = ["X", "X", "X", null, null, null, null, null, null];
    expect(isValidMove(board, 0)).toBe(false);
    expect(isValidMove(board, 9)).toBe(false);
    expect(isValidMove(board, -1)).toBe(false);
    expect(isValidMove(board, 4)).toBe(false);
    expect(placeMark(board, 4, "O")).toBe(board);
  });

  it("isValidMove rejects non-integer cell indices", () => {
    const board = createBoard();
    expect(isValidMove(board, NaN)).toBe(false);
    expect(isValidMove(board, Infinity)).toBe(false);
    expect(isValidMove(board, 2.7)).toBe(false);
    expect(isValidMove(board, -0.1)).toBe(false);
  });

  it("placeMark returns same board reference for invalid or no-op moves", () => {
    const board = createBoard();
    expect(placeMark(board, -1, "X")).toBe(board);
    expect(placeMark(board, 9, "X")).toBe(board);
    expect(placeMark(board, 1.5, "X")).toBe(board);

    const occupiedBoard: Board = ["X", null, null, null, null, null, null, null, null];
    expect(placeMark(occupiedBoard, 0, "O")).toBe(occupiedBoard);
  });

  it("placeMark places the mark immutably when valid", () => {
    const initial = createBoard();
    const next = placeMark(initial, 4, "X");
    expect(next).not.toBe(initial);
    expect(next[4]).toBe("X");
    expect(initial[4]).toBeNull();
  });
});
