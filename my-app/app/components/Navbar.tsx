// app/components/Navbar.tsx
"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface NavbarProps {
  initialUser?: User | null;
}

export default function Navbar({ initialUser }: NavbarProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Verificación inicial del cliente
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (event === "SIGNED_OUT") {
          router.refresh(); // Forzar recarga del layout
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Forzar recarga del layout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link href="/" className="mr-4 hover:text-gray-300">Inicio</Link>
        {user && (
          <>
            <Link href="/dashboard" className="mr-4 hover:text-gray-300">Dashboard</Link>
            <Link href="/profile" className="mr-4 hover:text-gray-300">Perfil</Link>
            <Link href="/pokedex" className="mr-4 hover:text-gray-300">Pokedex</Link>
          </>
        )}
      </div>
      <div className="flex gap-2">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/Sign-Up"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}