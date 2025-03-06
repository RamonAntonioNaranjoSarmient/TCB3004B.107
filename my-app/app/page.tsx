// app/page.tsx
"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";


export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();


  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">¡Bienvenido!</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push("/auth/login")}
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Ya estás autenticado</h1>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={logout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
