import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from '../utils/styles';
import CapacityScreen from './CapacityScreen';

type pokeProps = { description: string, stats: { statName: string, value: number }[] };
type infoProps = { text: pokeProps; imageId: number };


const PokeDescription = ({ text, imageId }: infoProps) => {
  return (
    <View style={styles.infosContainer}>
      <View style={styles.infos}>
        <Image
          style={styles.largeImageContainer}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`,
          }}
        />
        <Text style={styles.title}>{text.description.replace(/\s+/g, " ").trim()}</Text>
        <CapacityScreen stats={text.stats}></CapacityScreen>
      </View>
    </View>
  );
};

export default PokeDescription;
