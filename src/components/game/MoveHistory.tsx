"use client";

import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CELL_NAMES } from "@/lib/constants";
import type { Move } from "@/types/game";

export function MoveHistory({ moves, onUndo }: { moves: Move[]; onUndo: () => void }) {
  return (
    <section className="history-panel" aria-labelledby="history-title">
      <div className="section-heading">
        <div><span>GAME LOG</span><h2 id="history-title">Move history</h2></div>
        <button className="text-button" type="button" onClick={onUndo} disabled={!moves.length}><RotateCcw size={14} /> Undo</button>
      </div>
      <div className="moves">
        <AnimatePresence initial={false}>
          {!moves.length && <motion.p className="empty-log" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Your moves will appear here.</motion.p>}
          {moves.slice(-4).reverse().map((move, reversedIndex) => {
            const moveNumber = moves.length - reversedIndex;
            return (
              <motion.div className="move" key={moveNumber} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 8, opacity: 0 }}>
                <span className={`move-player ${move.player.toLowerCase()}`}>{move.player}</span>
                <span><strong>Move {String(moveNumber).padStart(2, "0")}</strong><small>{CELL_NAMES[move.cell]}</small></span>
                <i aria-hidden="true">↗</i>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
