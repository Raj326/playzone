import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const CourtCarousel = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.infoContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.carouselImage}
              />
              <View style={styles.infoView}>
                <Text style={styles.nameTxt}>{item.name}</Text>
                <Text style={styles.priceTxt}>{item.price}/h</Text>
              </View>
              <View style={styles.sportsContainer}>
                <Text style={styles.sportsTxt}>{item.sports}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: HEIGHT * 0.01,
    height: HEIGHT * 0.3,
    marginLeft: WIDTH * 0.04,
  },
  carouselImage: {
    width: WIDTH * 0.45,
    height: "60%",
    marginRight: 10,
    borderRadius: 10,
  },
  infoContainer: {
    marginRight: WIDTH * 0.02,
  },
  infoView: {
    flexDirection: "row",
    marginLeft: WIDTH * 0.02,
  },
  nameTxt: {
    fontSize: WIDTH * 0.035,
    fontWeight: "bold",
  },
  priceTxt: {
    fontSize: WIDTH * 0.035,
    marginLeft: WIDTH * 0.17,
    fontWeight: "bold",
  },
  sportsContainer: {
    marginLeft: WIDTH * 0.02,
    width: "90%",
  },
  sportsTxt: {
    fontSize: WIDTH * 0.035,
    fontWeight: "bold",
  },
});

export default CourtCarousel;
