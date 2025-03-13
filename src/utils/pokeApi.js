const BASE_ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

export const getAllPokemons = async (limit = 151, offset = 0) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokeData = await pokemonResponse.json();

        return {
          id: pokeData.id,
          name: pokemon.name,
          image1: pokeData.sprites.other.home.front_default,
          image2: pokeData.sprites.other.home.front_shiny,
          sound: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`,
          stats: {
            hp: pokeData.stats[0]?.base_stat || 0,
            attack: pokeData.stats[1]?.base_stat || 0,
            defense: pokeData.stats[2]?.base_stat || 0,
            specialAttack: pokeData.stats[3]?.base_stat || 0,
            specialDefense: pokeData.stats[4]?.base_stat || 0,
            speed: pokeData.stats[5]?.base_stat || 0,
          },
          height: pokeData.height,
          weight: pokeData.weight,
          types: pokeData.types,
        };
      })
    );
    return pokemonData;
  } catch (error) {
    console.error("No se pudo conseguir la información", error);
    throw error;
  }
};

export const getPokemon = async (pokemonInput) => {
  try {
    const pokemonIdentifier = isNaN(pokemonInput) ? pokemonInput.toLowerCase() : pokemonInput;

    const response = await fetch(`${BASE_ENDPOINT}/${pokemonIdentifier}`);
    const pokeData = await response.json();
    return {
      id: pokeData.id,
      name: pokeData.name,
      image1: pokeData.sprites.other.home.front_default,
      image2: pokeData.sprites.other.home.front_shiny,
      sound: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`,
      stats: {
        hp: pokeData.stats[0]?.base_stat || 0,
        attack: pokeData.stats[1]?.base_stat || 0,
        defense: pokeData.stats[2]?.base_stat || 0,
        specialAttack: pokeData.stats[3]?.base_stat || 0,
        specialDefense: pokeData.stats[4]?.base_stat || 0,
        speed: pokeData.stats[5]?.base_stat || 0,
      },
    };
  } catch (error) {
    console.error("No se pudo conseguir la información del Pokémon", error);
    throw error;
  }
};
