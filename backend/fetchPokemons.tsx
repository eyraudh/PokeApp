const backend = 'https://pokeapi.co/api/v2/';

/**
 * This function with find all pokemons which pokedex number
 * is between startSearch and endSearch
 */
const fetchAllPokemons = (startSearch: number, endSearch: number): any => {
  let data: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[] = [];
  for (let i = startSearch; i < endSearch; i++) {
    fetchPokemon(i, data);
  }
  return data;
};

/**
 * This function will fetch in the pokemon with the pokedex number
 * and extract the number, its name, and its sprite.
 * @param id the is of the pokemon to find
 */
const fetchPokemon = async (id: number, dataPokemon: any): Promise<void> => {
  const dataNameImage: Response = await fetch(`${backend}pokemon/${id}`);
  const pokemon: any = await dataNameImage.json();
  const dataDescription: Response = await fetch(
    `${backend}pokemon-species/${id}`,
  );
  const pokemonDescription: any = await dataDescription.json();
  const parseDesc = pokemonDescription.flavor_text_entries[0].flavor_text
    .replace(/\s+/g, ' ') // description were having trailing spaces.
    .trim();
  const parsedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_shiny,
    description: parseDesc,
  };

  dataPokemon.push(parsedPokemon);
};

export default fetchAllPokemons;