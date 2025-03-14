// app/Sign-Up/page.tsx
"use client";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío del formulario (no implementada)
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          className="border px-3 py-2 rounded w-64"
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded w-64"
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div className="relative w-64">
          <input
            className="border px-3 py-2 rounded w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-2 text-sm text-gray-600"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <div className="relative w-64">
          <input
            className="border px-3 py-2 rounded w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          className="px-4 py-2 bg-green-500 text-white rounded w-64"
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}