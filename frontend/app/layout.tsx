import "./globals.css";
export const metadata = {
  title: "MatchIQ",
  description: "AI Football Analytics Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#0a0f0b] text-[#f9fef6] font-[Manrope]">
        {children}
      </body>
    </html>
  );
}