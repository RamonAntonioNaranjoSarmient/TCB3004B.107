// app/(auth)/Sign-Up/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    // Prepare form data according to your API expectations
    const formData = new FormData();
    formData.append("username", firstName); // Using firstName as username
    formData.append("email", email);
    formData.append("password", password);

    try {
      // Call your server action directly
      const result = await signUp(formData);

      if (result.status === "success") {
        // Handle successful signup
        router.push("/");
      } else {
        // Handle errors from Supabase
        setError(typeof result.status === "string" ? result.status : "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          className="border px-3 py-2 rounded w-64"
          type="text"
          placeholder="Nombre (Username)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
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
            minLength={6}
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
            required
            minLength={6}
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
          className={`px-4 py-2 bg-green-500 text-white rounded w-64 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}