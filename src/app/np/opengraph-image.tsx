import { ImageResponse } from "next/og";

export const alt = "Потолки Всем для бизнеса — больше клиентов для компаний по натяжным потолкам";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Превью ссылки в мессенджерах: раздел распространяется именно ссылкой.
export default function OpenGraphImage() {
  const stairs = [150, 200, 250, 300];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(120deg, #06070c 0%, #0d0f17 55%, #1c1226 100%)", color: "#f4f5f8", fontFamily: "Arial, sans-serif", padding: "64px 72px", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 700 }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#ec3b43", boxShadow: "0 0 18px #ec3b43" }} />
          <span>Потолки Всем × ABBiO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 70, fontSize: 64, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.04 }}>
          <span>Больше клиентов</span>
          <span>для вашей компании</span>
          <span style={{ color: "#ff6168" }}>по натяжным потолкам</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 24, color: "rgba(244,245,248,.7)" }}>
          Партнёрство в вашем городе · Готовый сайт · SEO
        </div>
      </div>
      <div style={{ position: "absolute", right: 72, bottom: 64, display: "flex", alignItems: "flex-end", gap: 14 }}>
        {stairs.map((height, index) => (
          <div key={height} style={{ display: "flex", width: 68, height, borderRadius: "12px 12px 4px 4px", background: ["#ec3b43", "#f25a7a", "#d07cc4", "#b7a0ef"][index], opacity: index === 0 ? 1 : 0.55 }} />
        ))}
      </div>
    </div>,
    size,
  );
}
