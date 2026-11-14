"use client";

import { motion } from "motion/react";
import type { Player } from "@/types/game";

const lineClasses: Record<string, string> = {
  "0,1,2": "line row-1",
  "3,4,5": "line row-2",
  "6,7,8": "line row-3",
  "0,3,6": "line col-1",
  "1,4,7": "line col-2",
  "2,5,8": "line col-3",
  "0,4,8": "line diag-1",
  "2,4,6": "line diag-2",
};

interface WinningLineProps {
  winningLine: readonly number[];
  winner: Player | null;
}

export function WinningLine({ winningLine, winner }: WinningLineProps) {
  const verticalWin = winningLine[1] - winningLine[0] === 3;
  const baseClass = lineClasses[winningLine.join(",")];
  const winnerClass = winner ? `winner-${winner.toLowerCase()}` : "winner-x";

  if (!baseClass) return null;

  return (
    <motion.span
      className={`${baseClass} ${winnerClass}`}
      initial={{ scaleX: verticalWin ? 1 : 0, scaleY: verticalWin ? 0 : 1, opacity: 0 }}
      animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      transition={{ delay: 0.12, duration: 0.42 }}
    />
  );
}
