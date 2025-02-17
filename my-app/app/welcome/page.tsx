// app/welcome/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Welcome() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido al sistema!</h1>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={logout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
