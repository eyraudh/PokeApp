import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from '../utils/styles';

type infoProps = { description: string; imageId: number };



const PokeDescription = ({ description, imageId }: infoProps) => {
  return (
    <View style={styles.infosContainer}>
      <View style={styles.infos}>
        <Image
          style={styles.largeImageContainer}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`,
          }}
        />
        <Text style={styles.title}>{description.trim()}</Text>
      </View>
    </View>
  );
};

export default PokeDescription;
