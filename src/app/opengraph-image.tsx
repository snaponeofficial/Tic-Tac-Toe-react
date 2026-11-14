import { ImageResponse } from "next/og";

export const alt = "Tic Tac Toe — Classic Two-Player Game";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080B14",
        color: "#F8FAFC",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.12,
          background: "linear-gradient(135deg, #5EEAD4 0%, #080B14 38%, #A78BFA 100%)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ color: "#5EEAD4", fontSize: 20, letterSpacing: 8, marginBottom: 28 }}>
          CLASSIC TWO-PLAYER GAME
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -7, lineHeight: 1 }}>TIC TAC TOE</div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 28 }}>
          <span>Simple. Fast.&nbsp;</span>
          <span style={{ color: "#5EEAD4" }}>Familiar.</span>
        </div>
        <div style={{ color: "#94A3B8", fontSize: 20, marginTop: 18 }}>
          Two players. Nine squares. One winner.
        </div>
      </div>
    </div>,
    size
  );
}
