// app/(auth)/RecuperarContra/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import {forgotPassword} from "@/actions/auth";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("email", email);

    try {
      const result = await forgotPassword(formData);

      if (result.status === "success") {
        alert("Password reset send to email")
      } else {
        setError(
          result.status
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred during login");
    } finally {
      setLoading(false);
    }


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
        <Link href="/login">
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