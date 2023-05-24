import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from '../utils/styles';
type ItemProps = {name: string; image: string; description: string};

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

export default Item;