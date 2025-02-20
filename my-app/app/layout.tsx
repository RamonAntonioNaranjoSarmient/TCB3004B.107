// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}