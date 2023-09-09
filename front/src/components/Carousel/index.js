import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import "../../utils/i18n";
import { useTranslation } from "react-i18next";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Carousel = ({ data }) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.infoContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.carouselImage}
          />
          <View style={styles.infoView}>
            <Text style={styles.nameTxt}>{item.name}</Text>
            <Text style={styles.nameTxt}>{item.address}</Text>
            <Text style={styles.nameTxt}>{t('Data')}: {item.date}</Text>
            <Text style={styles.nameTxt}>{t('Horário')}: {item.hours}</Text>
          </View>
        </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: HEIGHT * 0.01,
    marginLeft: WIDTH * 0.04,
    height: HEIGHT * 0.5,
  },
  carouselImage: {
    width: WIDTH * 0.6,
    height: "50%",
    marginRight: 10,
    borderRadius: 10,
  },
  infoView: {
    marginLeft: WIDTH * 0.02,
  },
  nameTxt: {
    fontSize: WIDTH * 0.035,
    fontWeight: "bold",
  },
});

export default Carousel;