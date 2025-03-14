// app/auth/forgot-password/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Recuperar Contraseña</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          className="border px-3 py-2 rounded w-64"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded w-64"
          type="submit"
        >
          Enviar Instrucciones
        </button>
        <Link href="/auth/login">
          <button
            type="button"
            className="text-sm text-blue-500 hover:underline"
          >
            Volver al Inicio de Sesión
          </button>
        </Link>
      </form>
    </div>
  );
}