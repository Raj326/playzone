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

const NearCenterCarousel = ({ data }) => {
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
                <Text style={styles.nameTxt}>{item.address}</Text>
                <View style={styles.ratingView}>
                  <Image
                    source={require("../../assets/estrela.png")}
                    style={styles.iconStar}
                  />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
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
    marginLeft: WIDTH * 0.04,
    height: HEIGHT * 0.3,
  },
  carouselImage: {
    width: WIDTH * 0.6,
    height: "70%",
    marginRight: 10,
    borderRadius: 10,
  },
  infoContainer: {
    marginRight: WIDTH * 0.02,
  },
  infoView: {
    marginLeft: WIDTH * 0.02,
  },
  nameTxt: {
    fontSize: WIDTH * 0.035,
    fontWeight: "bold",
  },
  iconStar: {
    width: WIDTH * 0.06,
    height: WIDTH * 0.06,
  },
  ratingView: {
    flexDirection: "row"
  },
  ratingText: {
    fontSize: WIDTH * 0.045,
    fontWeight: "bold",
    color: "#FFC309",
    marginLeft: WIDTH * 0.01,
  },
});

export default NearCenterCarousel;
