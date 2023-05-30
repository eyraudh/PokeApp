import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from '../utils/styles';
type ItemProps = { name: string; imageId: number; handlePress(): void };

const Item = ({ name, imageId, handlePress }: ItemProps) => (
  <TouchableOpacity onPress={handlePress}>
    <View style={styles.item}>
      <Image
        style={styles.imageContainer}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`,
        }}
      />
      <Text style={styles.title}>{name}</Text>
    </View>
  </TouchableOpacity>
);

export default Item;