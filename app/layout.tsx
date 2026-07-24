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
        <main style={{ paddingTop: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
