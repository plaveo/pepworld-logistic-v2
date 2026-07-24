import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PEPWORLD Logistics Intelligence V2",
  description:
    "PEPWORLD Logistics Intelligence V2 — map-card workbench. " +
    "Demo mode active. Not connected to live data sources.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Build Rule 8: always label demo mode visibly */}
        <div className="demo-banner" aria-label="Demo mode active">
          ⚠ DEMO MODE — Mock payloads only. Not connected to live data.
        </div>
        {/* paddingTop matches --demo-banner-height CSS variable (28px) */}
        <main style={{ paddingTop: "var(--demo-banner-height)", height: "100vh", overflow: "hidden" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
