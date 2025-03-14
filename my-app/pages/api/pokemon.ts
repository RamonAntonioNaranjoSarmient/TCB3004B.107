import { PokemonClient } from 'pokenode-ts';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { limit = 10, offset = 0, name } = req.query; // Parámetros de paginación y búsqueda
  const api = new PokemonClient();

  try {
    let pokemonDetails: { id: number; name: string; sprites: string | null; back: string | null; types: string[]; stats: { name: string; value: number; }[]; height: number; weight: number; abilities: { name: string; is_hidden: boolean; slot: number; }[]; }[];

    // Búsqueda por nombre
    if (name && typeof name === 'string') {
      try {
        const details = await api.getPokemonByName(name.toLowerCase());
        pokemonDetails = [
          {
            id: details.id,
            name: details.name,
            sprites: details.sprites.front_default,
            back: details.sprites.back_default,
            types: details.types.map((type) => type.type.name),
            stats: details.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
            height: details.height,
            weight: details.weight,
            abilities: details.abilities.map((ability) => ({
              name: ability.ability.name,
              is_hidden: ability.is_hidden,
              slot: ability.slot,
            })),
          },
        ];
      } catch (error) {
        // Si no se encuentra el Pokémon, devolver un array vacío
        pokemonDetails = [];
      }
    } else {
      // Paginación
      const allPokemon = await api.listPokemons(Number(offset), Number(limit));

      // Obtener detalles de cada Pokémon
      pokemonDetails = await Promise.all(
        allPokemon.results.map(async (pokemon) => {
          const details = await api.getPokemonByName(pokemon.name);

          return {
            id: details.id,
            name: details.name,
            sprites: details.sprites.front_default,
            back: details.sprites.back_default,
            types: details.types.map((type) => type.type.name),
            stats: details.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
            height: details.height,
            weight: details.weight,
            abilities: details.abilities.map((ability) => ({
              name: ability.ability.name,
              is_hidden: ability.is_hidden,
              slot: ability.slot,
            })),
          };
        })
      );
    }

    // Devolver la lista de Pokémon con los campos seleccionados
    res.status(200).json(pokemonDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del Pokémon' });
  }
}