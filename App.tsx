/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';

type ItemProps = {name: string; image: string; description: string};
const backend = 'https://pokeapi.co/api/v2/';
const dataPokemon: {
  id: number;
  name: string;
  image: string;
  description: string;
}[] = [];
let startSearch = 1;
let endSearch = 10;

/**
 * This interface was previously used to try to make the keyExtractor work
 */
// interface Pokemon {
//   id: number;
//   name: string;
//   image: string;
// }

/**
 * This function with find all pokemons which pokedex number
 * is between startSearch and endSearch
 */
const fetchAllPokemons = (): void => {
  for (let i = startSearch; i < endSearch; i++) {
    fetchPokemon(i);
  }
  startSearch = endSearch;
  endSearch += 10;
};

/**
 * This function will fetch in the pokemon with the pokedex number
 * and extract the number, its name, and its sprite.
 * @param id the is of the pokemon to find
 */
const fetchPokemon = async (id: number): Promise<void> => {
  const dataNameImage: Response = await fetch(`${backend}pokemon/${id}`);
  const pokemon: any = await dataNameImage.json();
  const dataDescription: Response = await fetch(
    `${backend}pokemon-species/${id}`,
  );
  const pokemonDescription: any = await dataDescription.json();
  const parseDesc = pokemonDescription.flavor_text_entries[0].flavor_text
    .replace(/\s+/g, ' ') // description were having trailing spaces.
    .trim();
  console.log(parseDesc);
  const parsedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_shiny,
    description: parseDesc,
  };

  dataPokemon.push(parsedPokemon);
};

const Item = ({name, image, description}: ItemProps) => (
  <View style={styles.item}>
    <Image
      style={styles.imageContainer}
      source={{
        uri: image,
      }}
    />
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const App = () => {
  fetchAllPokemons();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataPokemon}
        renderItem={({item}) => (
          <Item
            name={item.name}
            image={item.image}
            description={item.description}
          />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={fetchAllPokemons}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexgrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
});

export default App;
