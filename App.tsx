import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
} from 'react-native';
import Item from './components/item';
import styles from './utils/styles';
import fetchAllPokemons from './backend/fetchPokemons';

const App = () => {
  const [startSearch, setStartSearch] = useState(1);
  const [endSearch, setEndSearch] = useState(10);
  const [dataPokemon, setDataPokemon] = useState<{
    id: number;
    name: string;
    image: string;
    description: string;
  }[]>([])

  useEffect(() =>  {
    handleEnd();
  }, [])

  function handleEnd() {
    setDataPokemon(dataPokemon.concat(fetchAllPokemons(startSearch, endSearch)));
    setStartSearch(endSearch);
    setEndSearch(10 + endSearch);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataPokemon}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            image={item.image}
            description={item.description}
          />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={() => { handleEnd() }}
      />
    </SafeAreaView>
  );
};

export default App;
