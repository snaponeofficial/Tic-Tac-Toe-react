"use client";

import { motion } from "motion/react";
import type { Scores } from "@/types/game";

export function Scoreboard({ scores, hydrated }: { scores: Scores; hydrated: boolean }) {
  const items = [
    { label: "X WINS", value: scores.X, className: "x-score" },
    { label: "DRAWS", value: scores.draws, className: "draw-score" },
    { label: "O WINS", value: scores.O, className: "o-score" },
    { label: "PLAYED", value: scores.total, className: "total-score" },
  ];
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      {items.map((item) => (
        <div className={`score ${item.className}`} key={item.label}>
          <small>{item.label}</small>
          <motion.strong key={hydrated ? item.value : 0} initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{hydrated ? item.value : "–"}</motion.strong>
        </div>
      ))}
    </div>
  );
}
