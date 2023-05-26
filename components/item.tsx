import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from '../utils/styles';
type ItemProps = {name: string; imageId: number};

const Item = ({name, imageId}: ItemProps) => (
  <View style={styles.item}>
    <Image
      style={styles.imageContainer}
      source={{
        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageId}.png`,
      }}
    />
    <Text style={styles.title}>{name}</Text>
    {/* <Text style={styles.description}>{description}</Text> */}
  </View>
);

export default Item;