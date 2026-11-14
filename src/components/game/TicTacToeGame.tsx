"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GameBoard } from "./GameBoard";
import { GameStatus } from "./GameStatus";
import { GameControls } from "./GameControls";
import { PlayerCard } from "./PlayerCard";
import { Scoreboard } from "./Scoreboard";
import { MoveHistory } from "./MoveHistory";

type Tone = "move" | "win" | "draw" | "button";

export function TicTacToeGame() {
  const game = useTicTacToe();
  const [theme, setTheme, themeHydrated] = useLocalStorage<"dark" | "light">("tic-tac-toe-theme", "dark");
  const [sound, setSound] = useLocalStorage("tic-tac-toe-sound", false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (themeHydrated) document.documentElement.dataset.theme = theme;
  }, [theme, themeHydrated]);

  const playTone = useCallback(
    (tone: Tone) => {
      if (!sound) return;
      try {
        const context = audioRef.current ?? new AudioContext();
        audioRef.current = context;
        const now = context.currentTime;
        const notes =
          tone === "win"
            ? [523, 659, 784]
            : tone === "draw"
            ? [330, 294]
            : [tone === "move" ? 440 : 360];

        notes.forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.type = tone === "button" ? "sine" : "triangle";
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0, now + index * 0.08);
          gain.gain.linearRampToValueAtTime(0.035, now + index * 0.08 + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.16);
          oscillator.connect(gain).connect(context.destination);
          oscillator.start(now + index * 0.08);
          oscillator.stop(now + index * 0.08 + 0.18);
        });
      } catch {
        /* Audio is an optional enhancement. */
      }
    },
    [sound]
  );

  const handlePlay = (cell: number) => {
    const nextResult = game.play(cell);
    if (!nextResult) return;
    playTone(
      nextResult.status === "won" ? "win" : nextResult.status === "draw" ? "draw" : "move"
    );
  };

  const handleNewGame = () => {
    playTone("button");
    game.newGame();
  };

  const winner = game.result.status === "won" ? game.result.winner : null;

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header
        sound={sound}
        theme={theme}
        onToggleSound={() => setSound((value) => !value)}
        onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
      />

      <main>
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">
            <i /> CLASSIC TWO-PLAYER GAME <i />
          </span>
          <h1>TIC TAC TOE</h1>
          <p className="tagline">
            Simple. Fast. <em>Familiar.</em>
          </p>
          <p className="hero-copy">Two players. Nine squares. One winner.</p>
        </motion.section>

        <motion.section
          className="game-dashboard"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          <aside className="side-column left-column">
            <div className="side-label">
              <span>01</span>
              <i /> PLAYERS
            </div>
            <PlayerCard
              player="X"
              active={game.result.status === "playing" && game.currentPlayer === "X"}
              winner={winner === "X"}
            />
            <PlayerCard
              player="O"
              active={game.result.status === "playing" && game.currentPlayer === "O"}
              winner={winner === "O"}
            />
            <div className="rules-note">
              <Sparkles size={15} />
              <span>
                <strong>HOW TO WIN</strong>
                Connect three marks in any direction.
              </span>
            </div>
          </aside>

          <section className="game-center" aria-label="Game area">
            <GameStatus result={game.result} currentPlayer={game.currentPlayer} />
            <GameBoard
              board={game.board}
              currentPlayer={game.currentPlayer}
              winner={winner}
              winningLine={game.result.winningLine}
              disabled={game.result.status !== "playing"}
              onPlay={handlePlay}
            />
            <GameControls
              onNewGame={handleNewGame}
              onResetScores={game.resetScores}
              playTone={playTone}
            />
          </section>

          <aside className="side-column right-column">
            <div className="side-label">
              <span>02</span>
              <i /> SESSION
            </div>
            <Scoreboard scores={game.scores} hydrated={game.scoresHydrated} />
            <MoveHistory
              moves={game.moves}
              onUndo={() => {
                playTone("button");
                game.undo();
              }}
            />
          </aside>
        </motion.section>
      </main>

      <Footer />

      <AnimatePresence>
        {winner && (
          <motion.div
            className={`celebration celebration-${winner.toLowerCase()}`}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 14 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

