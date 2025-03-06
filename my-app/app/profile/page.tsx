// app/profile/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading  , setLoading] = useState(true);
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
    else
    {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) return null; // No renderizar nada hasta verificar

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
    </div>
  );
}