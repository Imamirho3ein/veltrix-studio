import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/lib/constants";

// Satori's <img> is required here — next/image cannot render inside ImageResponse.
/* eslint-disable @next/next/no-img-element */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const alt = "VELTRIX STUDIO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

let assetCache:
  | { regular: ArrayBuffer; bold: ArrayBuffer; logo: string }
  | null = null;

async function loadAssets() {
  if (assetCache) return assetCache;

  // Satori (next/og) only parses TTF/OTF/WOFF, so the OG route uses the
  // static TTF builds of Vazirmatn instead of the WOFF2 files used by the app.
  const [regular, bold, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "src/fonts/og/Vazirmatn-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/fonts/og/Vazirmatn-Bold.ttf")),
    readFile(path.join(process.cwd(), "public/brand/logo-192.png")),
  ]);

  assetCache = {
    regular: regular.buffer.slice(
      regular.byteOffset,
      regular.byteOffset + regular.byteLength,
    ) as ArrayBuffer,
    bold: bold.buffer.slice(
      bold.byteOffset,
      bold.byteOffset + bold.byteLength,
    ) as ArrayBuffer,
    logo: `data:image/png;base64,${logo.toString("base64")}`,
  };

  return assetCache;
}

function trim(value: string | null, fallback: string, max: number) {
  const text = (value ?? "").trim();
  if (!text) return fallback;
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = trim(
    searchParams.get("title"),
    "طراحی سایت و تجربه‌های دیجیتال",
    70,
  );
  const subtitle = trim(
    searchParams.get("subtitle"),
    "استودیو طراحی و توسعه‌ی وب برای برندهای جسور.",
    120,
  );
  const label = trim(searchParams.get("label"), "VELTRIX STUDIO", 32);

  const assets = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0d0d",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "Vazirmatn, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-120px",
            width: "640px",
            height: "640px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(176, 137, 104,0.55) 0%, rgba(176, 137, 104,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            left: "-140px",
            width: "620px",
            height: "620px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(212, 185, 150,0.38) 0%, rgba(212, 185, 150,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.9,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <img
              src={assets.logo}
              width={68}
              height={68}
              alt=""
              style={{ display: "flex", objectFit: "contain" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  fontWeight: 800,
                  letterSpacing: "8px",
                  color: "#ffffff",
                  fontFamily: "Vazirmatn",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "14px",
                  letterSpacing: "9px",
                  color: "#adadad",
                  fontFamily: "Vazirmatn",
                  marginTop: "2px",
                }}
              >
                STUDIO · TEHRAN
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "999px",
              padding: "10px 22px",
              color: "#FFF9F0",
              fontSize: "18px",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            veltrixstudio.ir
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "72px",
              height: "5px",
              borderRadius: "999px",
              background: "linear-gradient(90deg,#b08968,#d4b996,#ede3d4)",
              marginBottom: "34px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? "60px" : "74px",
              lineHeight: 1.32,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              lineHeight: 1.9,
              color: "#adadad",
              marginTop: "26px",
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#adadad",
              fontSize: "19px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "9px",
                height: "9px",
                borderRadius: "999px",
                backgroundColor: "#d4b996",
              }}
            />
            طراحی · توسعه · موشن
          </div>
          <div
            style={{
              display: "flex",
              color: "#8c8c8c",
              fontSize: "18px",
              letterSpacing: "4px",
              fontFamily: "Vazirmatn",
            }}
          >
            {siteConfig.email}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Vazirmatn",
          data: assets.regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Vazirmatn",
          data: assets.bold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Vazirmatn",
          data: assets.bold,
          weight: 800,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
