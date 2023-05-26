import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
} from 'react-native';
import Item from './components/item';
import styles from './utils/styles';

const backend = 'https://pokeapi.co/api/v2/';
let dataPokemon: {
  id: number;
  name: string;
}[] = [];
let startSearch = 0;
let endSearch = 10;

/**
 * This interface was previously used to try to make the keyExtractor work
 */
// interface Pokemon {
//   id: number;
//   name: string;
//   image: string;
// }const

/**
 * This function with find all pokemons which pokedex number
 * is between startSearch and endSearch
 */
const fetchAllPokemons = async (startSearch: number, endSearch: number): Promise<void> => {
  const extractPokemon: Response = await fetch(`${backend}pokemon?limit=${endSearch}&offset=${startSearch}`);
  const pokemon = await extractPokemon.json();
  console.log("a\n");
  pokemon.results.forEach((element: any, index: number) => {
    dataPokemon.push({ id: index + 1, name: element.name })
  });
  console.log("b\n");
  startSearch = endSearch;
  endSearch += 10;
};

const App = () => {
  fetchAllPokemons(startSearch, endSearch);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataPokemon}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            imageId={item.id}
          // description={item.description}
          />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={() => fetchAllPokemons(startSearch, endSearch)}
      />
    </SafeAreaView>
  );
};

export default App;
