import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const Carousel = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.carouselImage} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  carouselImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default Carousel;