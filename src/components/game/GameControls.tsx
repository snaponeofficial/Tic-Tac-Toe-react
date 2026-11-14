"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

interface GameControlsProps {
  onNewGame: () => void;
  onResetScores: () => void;
  playTone?: (tone: "button") => void;
}

export function GameControls({ onNewGame, onResetScores, playTone }: GameControlsProps) {
  const [resetOpen, setResetOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const resetTriggerRef = useRef<HTMLButtonElement>(null);
  const openedOnceRef = useRef(false);

  useEffect(() => {
    const pageRegions = document.querySelectorAll<HTMLElement>(".header, main, footer");
    const previousOverflow = document.body.style.overflow;

    pageRegions.forEach((region) => {
      region.inert = resetOpen;
      if (resetOpen) region.setAttribute("aria-hidden", "true");
      else region.removeAttribute("aria-hidden");
    });

    if (resetOpen) {
      openedOnceRef.current = true;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => cancelRef.current?.focus());
    } else {
      document.body.style.overflow = previousOverflow;
      if (openedOnceRef.current) requestAnimationFrame(() => resetTriggerRef.current?.focus());
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResetOpen(false);
    };
    if (resetOpen) window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
      pageRegions.forEach((region) => {
        region.inert = false;
        region.removeAttribute("aria-hidden");
      });
    };
  }, [resetOpen]);

  const handleConfirmReset = () => {
    playTone?.("button");
    onResetScores();
    setResetOpen(false);
  };

  return (
    <>
      <button className="primary-button" type="button" onClick={onNewGame}>
        <RotateCcw size={17} /> New Game
      </button>

      <button ref={resetTriggerRef} className="reset-button" type="button" onClick={() => setResetOpen(true)}>
        Reset all scores
      </button>

      {resetOpen &&
        createPortal(
          <motion.div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={() => setResetOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="reset-title"
              aria-describedby="reset-description"
              onMouseDown={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
            >
              <span className="modal-icon">
                <RotateCcw />
              </span>
              <h2 id="reset-title">Reset scoreboard?</h2>
              <p id="reset-description">
                This clears every win, draw, and game played. Your current board stays intact.
              </p>
              <div>
                <button
                  ref={cancelRef}
                  type="button"
                  className="secondary-button"
                  onClick={() => setResetOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="danger-button"
                  onClick={handleConfirmReset}
                >
                  Reset scores
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
    </>
  );
}
