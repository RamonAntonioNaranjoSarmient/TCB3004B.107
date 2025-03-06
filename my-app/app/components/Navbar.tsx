// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link href="/" className="mr-4">Inicio</Link>
        {isAuthenticated && <Link href="/dashboard" className="mr-4">Dashboard</Link>}
        {isAuthenticated && <Link href="/profile" className="mr-4">Perfil</Link>}
        {isAuthenticated && <Link href="/pokedex" className="mr-4">Pokedex</Link>}
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Cerrar Sesión</button>
        ) : (
          <Link href="/auth/login" className="bg-blue-500 px-4 py-2 rounded">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
}