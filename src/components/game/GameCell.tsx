"use client";

import { motion } from "motion/react";
import { CELL_NAMES } from "@/lib/constants";
import type { Cell, Player } from "@/types/game";
import { Mark } from "./Mark";

interface GameCellProps {
  index: number;
  cell: Cell;
  currentPlayer: Player;
  winner: Player | null;
  winning: boolean;
  disabled: boolean;
  onPlay: (cell: number) => void;
  onKeyDown: (event: React.KeyboardEvent, index: number) => void;
  refCallback: (node: HTMLButtonElement | null) => void;
}

export function GameCell({
  index,
  cell,
  currentPlayer,
  winner,
  winning,
  disabled,
  onPlay,
  onKeyDown,
  refCallback,
}: GameCellProps) {
  const winnerClass = winning && winner ? `winner winner-${winner.toLowerCase()}` : winning ? "winner" : "";
  const label = cell
    ? `${CELL_NAMES[index]}: Player ${cell}`
    : disabled
    ? `${CELL_NAMES[index]}: empty`
    : `${CELL_NAMES[index]}: empty, place ${currentPlayer}`;

  return (
    <motion.button
      ref={refCallback}
      type="button"
      className={`cell ${winnerClass}`}
      aria-label={label}
      disabled={disabled || cell !== null}
      onClick={() => onPlay(index)}
      onKeyDown={(event) => onKeyDown(event, index)}
      variants={{ hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } }}
      transition={{ duration: 0.22 }}
    >
      {cell ? (
        <Mark player={cell} />
      ) : (
        !disabled && (
          <span className="preview-mark">
            <Mark player={currentPlayer} preview />
          </span>
        )
      )}
      <span className="cell-index" aria-hidden="true">
        0{index + 1}
      </span>
    </motion.button>
  );
}
