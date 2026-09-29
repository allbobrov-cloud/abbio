import { ImageResponse } from "next/og";

export const alt = "ABBiO — дизайн, сайты и маркетинг для бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "linear-gradient(125deg, #05070d 0%, #0b0a16 48%, #231b3d 100%)", color: "#f7f5ff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", width: 610, height: 610, top: 52, right: -100, borderRadius: 610, background: "radial-gradient(circle, rgba(142, 100, 232, .42) 0%, rgba(92, 67, 157, .12) 48%, transparent 72%)" }} />
      <div style={{ position: "absolute", inset: 28, border: "1px solid rgba(212, 195, 255, .16)", borderRadius: 28, display: "flex" }} />

      <div style={{ display: "flex", flexDirection: "column", padding: "68px 74px", width: 765 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
          <div style={{ display: "flex", fontSize: 63, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
            ABB<span style={{ color: "#bca5fa" }}>i</span>O
          </div>
          <div style={{ width: 1, height: 41, background: "rgba(220, 206, 255, .28)" }} />
          <div style={{ display: "flex", flexDirection: "column", color: "#c9c2d7", fontSize: 16, lineHeight: 1.25 }}>
            <span>дизайн · сайты</span><span>маркетинг</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 98, fontSize: 66, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
          <span>Дизайн, сайты</span>
          <span>и маркетинг.</span>
          <span style={{ color: "#bca5fa" }}>Для бизнеса.</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 15, marginTop: "auto", color: "#cbc5d7", fontSize: 20 }}>
          <div style={{ width: 7, height: 7, borderRadius: 7, background: "#bca5fa" }} />
          <span>abbio.ru</span>
        </div>
      </div>

      <div style={{ position: "absolute", display: "flex", width: 342, height: 456, top: 94, right: 78, transform: "rotate(8deg)", borderRadius: 24, border: "1px solid rgba(233, 222, 255, .26)", background: "linear-gradient(150deg, #241c39, #0b0b17)", boxShadow: "0 30px 80px rgba(0, 0, 0, .45)", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 7, background: "#bca5fa" }} />
              <div style={{ width: 7, height: 7, borderRadius: 7, background: "#6f608b" }} />
              <div style={{ width: 7, height: 7, borderRadius: 7, background: "#6f608b" }} />
            </div>
            <div style={{ display: "flex", width: 72, height: 8, borderRadius: 8, background: "rgba(232, 222, 255, .16)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 55, gap: 11 }}>
            <div style={{ display: "flex", width: 172, height: 14, borderRadius: 14, background: "#bca5fa" }} />
            <div style={{ display: "flex", width: 251, height: 28, borderRadius: 8, background: "#f2ecff" }} />
            <div style={{ display: "flex", width: 218, height: 28, borderRadius: 8, background: "#f2ecff" }} />
            <div style={{ display: "flex", width: 184, height: 9, marginTop: 9, borderRadius: 9, background: "rgba(232, 222, 255, .36)" }} />
          </div>
          <div style={{ display: "flex", flex: 1, marginTop: 34, borderRadius: 16, border: "1px solid rgba(230, 216, 255, .14)", background: "linear-gradient(135deg, #52417c 0%, #8872bb 45%, #1b1a2d 100%)" }} />
          <div style={{ display: "flex", width: 104, height: 29, marginTop: 19, borderRadius: 20, background: "#bca5fa" }} />
        </div>
      </div>
    </div>,
    size,
  );
}
