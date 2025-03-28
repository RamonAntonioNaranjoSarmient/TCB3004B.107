// app/layout.tsx
import { getUserSession } from "@/actions/auth";
import Navbar from "./components/Navbar";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  
  return (
    <html lang="es">
      <body>
        <Navbar initialUser={session?.user} />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}