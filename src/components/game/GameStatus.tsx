"use client";

import { motion } from "motion/react";
import type { GameResult, Player } from "@/types/game";

interface GameStatusProps {
  result: GameResult;
  currentPlayer: Player;
}

export function GameStatus({ result, currentPlayer }: GameStatusProps) {
  const status =
    result.status === "won"
      ? `Player ${result.winner} Wins!`
      : result.status === "draw"
      ? "It's a Draw!"
      : `Player ${currentPlayer}'s Turn`;

  const glyph = result.status === "draw" ? "=" : result.winner ?? currentPlayer;
  const glyphClass = (result.winner ?? currentPlayer).toLowerCase();

  return (
    <div
      className="status-wrap"
      role="status"
      aria-live={result.status === "playing" ? "polite" : "assertive"}
      aria-atomic="true"
    >
      <motion.div
        className={`status status-${result.status}`}
        key={status}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <span className={`status-glyph ${glyphClass}`} aria-hidden="true">{glyph}</span>
        <span>
          <small>{result.status === "playing" ? "MATCH IN PROGRESS" : "MATCH COMPLETE"}</small>
          <strong>{status}</strong>
        </span>
      </motion.div>
    </div>
  );
}
