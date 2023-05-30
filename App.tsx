import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
} from 'react-native';
import Item from './components/item';
import styles from './utils/styles';
import PokeDescription from './screen/PokeDescription';

const backend = 'https://pokeapi.co/api/v2/';
let dataPokemon: {
  id: number;
  name: string;
}[] = [];
let startSearch = 0;
let endSearch = 10;
let info: string;

/**
 * This function with find all pokemons which pokedex number
 * is between startSearch and endSearch
 */
const fetchAllPokemons = async (startSearch: number, endSearch: number): Promise<void> => {
  const extractPokemon: Response = await fetch(`${backend}pokemon?limit=${endSearch}&offset=${startSearch}`);
  const pokemon = await extractPokemon.json();
  pokemon.results.forEach((element: any, index: number) => {
    dataPokemon.push({ id: index + 1, name: element.name })
  });
  startSearch = endSearch;
  endSearch += 10;
};

/**
 * This function with find a pokemon description
 */
const fetchDescription = async (name: string, setDesc: (desc: any) => void): Promise<void> => {
  const extractDescription: Response = await fetch(`${backend}pokemon-species/${name}`);
  const description = await extractDescription.json();
  function isFrench(element: any) {
  return element.language.name === "fr";
}
  info = description.flavor_text_entries.find(isFrench).flavor_text;
  setDesc(info)
};

const App = () => {
  const [showDesc, setShowDesc] = useState(true);
  const [desc, setDesc] = useState("");
  const [pokemonId, setPokemonId] = useState(1);
  fetchAllPokemons(startSearch, endSearch);
  return (
    <SafeAreaView style={styles.container}>
      {showDesc ?
        <FlatList
          data={dataPokemon}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              imageId={item.id}
              handlePress={() => { setShowDesc(false); setPokemonId(item.id); fetchDescription(item.name, setDesc); }}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={() => fetchAllPokemons(startSearch, endSearch)}
        />
        :
        <PokeDescription description={desc} imageId={pokemonId} />
      }
    </SafeAreaView>
  );
};

export default App;
