import { PokemonClient } from 'pokenode-ts';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = new PokemonClient();

  try {
    // Obtener todos los Pokémon
    const allPokemon = await api.listPokemons(0, 1025); // Ajusta el límite según sea necesario

    // Obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      allPokemon.results.map(async (pokemon) => {
        const details = await api.getPokemonByName(pokemon.name);

        // Seleccionar los campos que deseas mostrar
        return {
          id: details.id,
          name: details.name,
          sprites: details.sprites.front_default, // Imagen frontal
          back: details.sprites.back_default,
          types: details.types.map((type) => type.type.name), // Tipos
          stats: details.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })), // Estadísticas
          height: details.height, // Altura
          weight: details.weight, // Peso
          abilities: details.abilities.map((ability)=>({
            name : ability.ability.name,
            is_hidden: ability.is_hidden,
            slot: ability.slot
          })),
    
        };

        
      })
    );

    // Devolver la lista de Pokémon con los campos seleccionados
    res.status(200).json(pokemonDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del Pokémon' });
  }
}