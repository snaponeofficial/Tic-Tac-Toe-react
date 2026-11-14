"use client";

import { motion } from "motion/react";
import type { Player } from "@/types/game";

export function PlayerCard({ player, active, winner }: { player: Player; active: boolean; winner: boolean }) {
  return (
    <motion.div className={`player-card player-${player.toLowerCase()} ${active ? "active" : ""} ${winner ? "victorious" : ""}`} animate={winner ? { y: [0, -3, 0] } : { y: 0 }} transition={{ duration: .45 }}>
      <span className="avatar">{player}</span>
      <span className="player-info"><small>PLAYER {player}</small><strong>{winner ? "Winner" : active ? "Your turn" : "Waiting"}</strong></span>
      <span className="activity-dot" aria-hidden="true" />
    </motion.div>
  );
}
