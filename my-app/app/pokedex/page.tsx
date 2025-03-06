"use client";
import { useEffect, useState } from 'react';
import CardFun from '../components/Card';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Pokemon {
  id: number;
  name: string;
  sprites: string;
  back: string;
  types: string[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
  abilities: { name: string; is_hidden: boolean }[];
}

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else {
      setLoading(false);
      const fetchPokemon = async () => {
        try {
          const response = await fetch('/api/pokemon');
          if (!response.ok) {
            throw new Error('Error al obtener los datos del Pokémon');
          }
          const data = await response.json();
          setPokemonList(data);
        } catch (err) {
          setError('Oops! Algo salió mal.');
          console.error(err);
        }
      };

      fetchPokemon();
    }
  }, [isAuthenticated, router]);

  if (loading) return null; // No renderizar nada hasta verificar

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Pokédex</h1>

      {/* Lista de Pokémon */}
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
                <li key={stat.name}> {/* Agregar key aquí */}
                  {stat.name}: {stat.value}
                </li>
              ))}
            </ul>

            <strong>Habilidades:</strong>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.name}> {/* Agregar key aquí */}
                  {ability.is_hidden ? "Hidden Ability: " : "Ability: "}
                  {ability.name}
                </li>
              ))}
            </ul>
          </CardFun>
        ))}
      </div>
    </div>
  );
}