import { ImageResponse } from "next/og";

export const alt = "ABBiO — дизайн, сайты и маркетинг";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px 86px",
        color: "#f7f5ff",
        background: "linear-gradient(135deg, #05070d 0%, #342244 70%, #5c4385 100%)",
      }}
    >
      <div style={{ display: "flex", fontSize: 84, fontWeight: 800, letterSpacing: -5 }}>
        ABB<span style={{ color: "#b7a0ef" }}>i</span>O
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 55, fontWeight: 600, lineHeight: 1.08 }}>
          <span>Дизайн, сайты</span>
          <span>и маркетинг</span>
        </div>
        <div style={{ fontSize: 26, color: "#d4c8e7" }}>Агентство ABBiO · abbio.ru</div>
      </div>
    </div>,
    size,
  );
}
