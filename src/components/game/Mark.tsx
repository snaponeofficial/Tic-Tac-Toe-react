"use client";

import { motion } from "motion/react";
import type { Player } from "@/types/game";

export function Mark({ player, preview = false }: { player: Player; preview?: boolean }) {
  if (player === "X") {
    return (
      <motion.svg className={`mark mark-x ${preview ? "preview" : ""}`} viewBox="0 0 100 100" initial={preview ? false : { scale: .65, opacity: 0 }} animate={{ scale: 1, opacity: preview ? .17 : 1 }}>
        <motion.path d="M24 24L76 76" pathLength="1" initial={preview ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .24 }} />
        <motion.path d="M76 24L24 76" pathLength="1" initial={preview ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .24, delay: .05 }} />
      </motion.svg>
    );
  }
  return (
    <motion.svg className={`mark mark-o ${preview ? "preview" : ""}`} viewBox="0 0 100 100" initial={preview ? false : { scale: .65, opacity: 0 }} animate={{ scale: 1, opacity: preview ? .17 : 1 }}>
      <motion.circle cx="50" cy="50" r="29" pathLength="1" initial={preview ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .32 }} />
    </motion.svg>
  );
}
