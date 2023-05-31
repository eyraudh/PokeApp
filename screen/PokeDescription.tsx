import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import styles from '../utils/styles';
import CapacityScreen from './CapacityScreen';

type pokeProps = { description: string, stats: { statName: string, value: number }[] };
type infoProps = { text: pokeProps; imageId: number; goBack: (arg0: any) => void };


const PokeDescription = ({ text, imageId, goBack }: infoProps) => {
  return (
    <View style={styles.infosContainer}>
        <Pressable style={styles.buttonContainer} onPress={goBack}>
          <Text style={{color: 'black', fontSize: 30}}> {'<'} </Text>
        </Pressable>
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
