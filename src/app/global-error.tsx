"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          color: "#ffffff",
          fontFamily: "Tahoma, system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "#b08968",
              margin: 0,
            }}
          >
            VELTRIX STUDIO
          </p>
          <h1 style={{ marginTop: "1.5rem", fontSize: "1.6rem" }}>
            خطای غیرمنتظره
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: "#adadad",
            }}
          >
            متأسفانه صفحه به‌درستی بارگذاری نشد. لطفاً دوباره تلاش کنید.
          </p>
          {error.digest ? (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: "#717171",
                direction: "ltr",
              }}
            >
              ERROR CODE: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              height: "2.75rem",
              paddingInline: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "linear-gradient(135deg,#b08968,#d4b996)",
              color: "#2c241d",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            تلاش دوباره
          </button>
        </div>
      </body>
    </html>
  );
}
