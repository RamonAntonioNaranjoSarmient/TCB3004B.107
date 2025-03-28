// app/profile/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.replace("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">Información del Usuario</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre de usuario</p>
                <p className="font-medium">{user?.user_metadata?.username || 'No especificado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha de registro</p>
                <p className="font-medium">
                  {new Date(user?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}