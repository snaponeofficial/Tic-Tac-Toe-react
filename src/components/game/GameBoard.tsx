"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { Board, Player } from "@/types/game";
import { GameCell } from "./GameCell";
import { WinningLine } from "./WinningLine";

interface GameBoardProps {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningLine: readonly number[] | null;
  disabled: boolean;
  onPlay: (cell: number) => void;
}

export function GameBoard({
  board,
  currentPlayer,
  winner,
  winningLine,
  disabled,
  onPlay,
}: GameBoardProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    let target = index;
    if (event.key === "ArrowRight") target = row * 3 + ((col + 1) % 3);
    else if (event.key === "ArrowLeft") target = row * 3 + ((col + 2) % 3);
    else if (event.key === "ArrowDown") target = ((row + 1) % 3) * 3 + col;
    else if (event.key === "ArrowUp") target = ((row + 2) % 3) * 3 + col;
    else return;
    event.preventDefault();
    refs.current[target]?.focus();
  };

  const turnClass = `turn-${currentPlayer.toLowerCase()}`;

  return (
    <div className={`board-wrap ${turnClass}`}>
      <motion.div
        className="board"
        role="group"
        aria-label="Tic tac toe board"
        aria-roledescription="game board"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      >
        {board.map((cell, index) => {
          const winning = winningLine?.includes(index) ?? false;
          return (
            <GameCell
              key={index}
              index={index}
              cell={cell}
              currentPlayer={currentPlayer}
              winner={winner}
              winning={winning}
              disabled={disabled}
              onPlay={onPlay}
              onKeyDown={onKeyDown}
              refCallback={(node) => {
                refs.current[index] = node;
              }}
            />
          );
        })}
        {winningLine && <WinningLine winningLine={winningLine} winner={winner} />}
      </motion.div>
    </div>
  );
}
