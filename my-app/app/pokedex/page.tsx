//app/pokedex/page.tsx
"use client";
import { useEffect, useState } from 'react';
import CardFun from '../components/Card';
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface Pokemon {
  id: number;
  name: string;
  sprites: string;
  back: string;
  types: string[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
  abilities: { name: string; is_hidden: boolean; slot: number }[];
}

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  const limit = 10; // Número de Pokémon por página



  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.replace("/auth/login");
      } else {
        setUser(user);
        setLoading(false);
        fetchPokemon();
      }
    };

    checkAuth();
  }, [router, currentPage, searchQuery]);


  const fetchPokemon = async () => {
    try {
      const offset = (currentPage - 1) * limit;
      const response = await fetch(
        `/api/pokemon?limit=${limit}&offset=${offset}&name=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error('Error al obtener los datos del Pokémon');
      }
      const data = await response.json();
      setPokemonList(data);
      setTotalPages(Math.ceil(1025 / limit)); // Total de Pokémon disponibles
      setLoading(false);
    } catch (err) {
      setError('Oops! Algo salió mal.');
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reiniciar a la primera página al buscar
    fetchPokemon();
  };

  if (loading) return <div>Cargando...</div>;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Pokédex</h1>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Buscar
        </button>
      </form>

      {/* Lista de Pokémon */}
      {pokemonList.length === 0 ? (
        <div>No se encontraron resultados.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemonList.map((pokemon) => (
            <CardFun
              className="border p-4 rounded-lg shadow-md"
              id={pokemon.id}
              title={pokemon.name}
              titleClassName="text-xl font-bold capitalize"
              description="Cartas pokemon"
              descriptionClassName="text-s font-bold capitalize"
              footer='Panchos'
              key={pokemon.id}
            >
              <div className="grid grid-flow-col">
                <img
                  src={pokemon.sprites}
                  alt={pokemon.name}
                  className="w-full h-32 object-contain"
                />
                <img
                  src={pokemon.back}
                  alt={pokemon.name}
                  className="w-full h-32 object-contain"
                />
              </div>

              <strong>Estadísticas:</strong>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.name}>
                    {stat.name}: {stat.value}
                  </li>
                ))}
              </ul>

              <strong>Habilidades:</strong>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.name}>
                    {ability.is_hidden ? "Hidden Ability: " : "Ability: "}
                    {ability.name}
                  </li>
                ))}
              </ul>
            </CardFun>
          ))}
        </div>
      )}

      {/* Paginación */}
      {pokemonList.length > 0 && (
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isFirstPage = pageNumber === 1;
            const isLastPage = pageNumber === totalPages;
            const isCurrentPage = pageNumber === currentPage;
            const isNearCurrentPage = Math.abs(pageNumber - currentPage) <= 2;

            // Mostrar siempre la primera página, la última, la actual y las adyacentes
            if (isFirstPage || isLastPage || isCurrentPage || isNearCurrentPage) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mx-1 ${
                    isCurrentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded`}
                >
                  {pageNumber}
                </button>
              );
            }

            // Mostrar puntos suspensivos para indicar páginas ocultas
            if (pageNumber === 2 || pageNumber === totalPages - 1) {
              return (
                <span key={pageNumber} className="px-4 py-2 mx-1">
                  ...
                </span>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}