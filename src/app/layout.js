import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./admin-log/background.css";
import "./globals.css";

export const metadata = {
  title: "Smartie",
  description: "Generated by Next.js",
  icons: {
    icon: "/public/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
