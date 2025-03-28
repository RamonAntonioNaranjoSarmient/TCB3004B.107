// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/actions/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await signIn(formData);

      if (result.status === "success") {
        router.refresh();
        router.push("/");
      } else {
        setError(
          typeof result.status === "string" 
            ? result.status 
            : "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded w-64 text-center">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          className="border px-3 py-2 rounded w-64"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative w-64">
          <input
            className="border px-3 py-2 rounded w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-2 text-sm text-gray-600"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <button
          className={`px-4 py-2 bg-green-500 text-white rounded w-64 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Entrar"}
        </button>
      </form>
      <Link 
        href="../RecuperarContra" 
        className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        ¿Olvidaste tu contraseña?
      </Link>
      <Link 
        href="../Sign-Up" 
        className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-800"
      >
        ¿No tienes cuenta? Regístrate
      </Link>
    </div>
  );
}