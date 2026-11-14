"use client";

import { useCallback, useMemo, useState } from "react";
import { EMPTY_SCORES } from "@/lib/constants";
import { createBoard, evaluateBoard, isValidMove, placeMark, switchPlayer } from "@/lib/game-logic";
import type { Board, Move, Player, Scores } from "@/types/game";
import { useLocalStorage } from "./useLocalStorage";

export function useTicTacToe() {
  const [board, setBoard] = useState<Board>(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [moves, setMoves] = useState<Move[]>([]);
  const [scores, setScores, scoresHydrated] = useLocalStorage<Scores>("tic-tac-toe-scores", { ...EMPTY_SCORES });
  const result = useMemo(() => evaluateBoard(board), [board]);

  const recordResult = useCallback((status: ReturnType<typeof evaluateBoard>) => {
    if (status.status === "won") {
      setScores((score) => ({ ...score, [status.winner]: score[status.winner] + 1, total: score.total + 1 }));
    } else if (status.status === "draw") {
      setScores((score) => ({ ...score, draws: score.draws + 1, total: score.total + 1 }));
    }
  }, [setScores]);

  const play = useCallback((cell: number) => {
    if (!isValidMove(board, cell, result)) return null;
    const nextBoard = placeMark(board, cell, currentPlayer);
    const nextResult = evaluateBoard(nextBoard);
    setBoard(nextBoard);
    setMoves((history) => [...history, { player: currentPlayer, cell }]);
    if (nextResult.status === "playing") setCurrentPlayer(switchPlayer(currentPlayer));
    else recordResult(nextResult);
    return nextResult;
  }, [board, currentPlayer, recordResult, result]);

  const newGame = useCallback(() => {
    setBoard(createBoard());
    setCurrentPlayer("X");
    setMoves([]);
  }, []);

  const undo = useCallback(() => {
    if (!moves.length) return;
    if (result.status === "won") {
      setScores((score) => ({ ...score, [result.winner]: Math.max(0, score[result.winner] - 1), total: Math.max(0, score.total - 1) }));
    } else if (result.status === "draw") {
      setScores((score) => ({ ...score, draws: Math.max(0, score.draws - 1), total: Math.max(0, score.total - 1) }));
    }
    const last = moves[moves.length - 1];
    const next = [...board];
    next[last.cell] = null;
    setBoard(next);
    setMoves((history) => history.slice(0, -1));
    setCurrentPlayer(last.player);
  }, [board, moves, result, setScores]);

  const resetScores = useCallback(() => setScores({ ...EMPTY_SCORES }), [setScores]);

  return { board, currentPlayer, moves, result, scores, scoresHydrated, play, newGame, undo, resetScores };
}
