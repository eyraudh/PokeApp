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

/**
 * This function with find all pokemons which pokedex number
 * is between startSearch and endSearch
 */
const fetchAllPokemons = async (startSearch: number, endSearch: number): Promise<void> => {
  const extractPokemon: Response = await fetch(`${backend}pokemon?limit=${endSearch}&offset=${startSearch}`);
  const pokemon = await extractPokemon.json();
  pokemon.results.forEach((element: any, index: number) => {
    dataPokemon.push({ id: index + 1 + startSearch, name: element.name })
  });
};

/**
 * This function will find a pokemon description
 */
const fetchDescription = async (name: string, setDesc: (desc: any) => void): Promise<void> => {
  const extractDescription: Response = await fetch(`${backend}pokemon-species/${name}`);
  const description = await extractDescription.json();
  const extractStats: Response = await fetch(`${backend}pokemon/${name}`)
  const stats = await extractStats.json();

  function isFrench(element: any) {
    return element.language.name === "fr";
  }
  let info = {
    description: description.flavor_text_entries.find(isFrench).flavor_text,
    stats: stats.stats.map((x: { stat: { name: any; }; base_stat: any; }) => {
      return { statName: x.stat.name, value: x.base_stat }
    })
  };
  setDesc(info)
};

type Pokemonprops = {
  description: string;
  stats: { statName: string, value: number }[]
}

const App = () => {
  const [startSearch, setStartSearch] = useState(0);
  const [endSearch, setEndSearch] = useState(10);
  const [showDesc, setShowDesc] = useState(true);
  const [desc, setDesc] = useState<Pokemonprops>({ description: "", stats: []});
  const [pokemonId, setPokemonId] = useState(1);
  useEffect(() => {
    fetchAllPokemons(startSearch, endSearch);
    setStartSearch(endSearch);
    setEndSearch(endSearch + 10)
  }, dataPokemon);

  return (
    <SafeAreaView style={styles.container}>
      {showDesc ?
        <FlatList
          data={dataPokemon}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              imageId={item.id}
              handlePress={() => {
                setShowDesc(false);
                setPokemonId(item.id);
                fetchDescription(item.name, setDesc);
              }}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            fetchAllPokemons(startSearch, endSearch);
            setStartSearch(endSearch);
            setEndSearch(endSearch + 10);
          }}
        />
        :
        <PokeDescription text={desc} imageId={pokemonId} />
      }
    </SafeAreaView>
  );
};

export default App;
