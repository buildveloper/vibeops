import { ImageResponse } from "next/og";

export const alt =
  "VibeOps, operations automation for small business. Describe the work. We'll build the machine.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F0E6",
          color: "#1C1A16",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #D8D1C2",
            paddingBottom: "22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                background: "#1C1A16",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F4F0E6",
                fontSize: "22px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              V
            </div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                fontFamily: "Arial, sans-serif",
              }}
            >
              VibeOps
            </div>
          </div>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6D675C",
              fontFamily: "Courier New, monospace",
            }}
          >
            Operations automation for small business
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8F2F16",
              fontFamily: "Courier New, monospace",
            }}
          >
            <div style={{ width: "8px", height: "8px", background: "#B23A1B" }} />
            For the businesses that keep things running
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Georgia, serif",
              fontSize: "82px",
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            <span>Describe the work.</span>
            <span style={{ color: "#8F2F16" }}>We&apos;ll build the machine.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #D8D1C2",
            paddingTop: "20px",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6D675C",
            fontFamily: "Courier New, monospace",
          }}
        >
          <span>Three plans free / No card / Export anytime</span>
          <span style={{ color: "#8F2F16" }}>vibeops.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
