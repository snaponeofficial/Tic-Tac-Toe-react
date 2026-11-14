"use client";

import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface HeaderProps {
  sound: boolean;
  theme: "dark" | "light";
  onToggleSound: () => void;
  onToggleTheme: () => void;
}

export function Header({ sound, theme, onToggleSound, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <Logo />
      <div className="header-actions">
        <button
          className="icon-button"
          type="button"
          onClick={onToggleSound}
          aria-label={sound ? "Mute sound" : "Enable sound"}
        >
          {sound ? <Volume2 /> : <VolumeX />}
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}
