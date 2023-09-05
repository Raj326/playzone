import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Slider from "@react-native-community/slider";
import "../../utils/i18n";

import { useTranslation } from "react-i18next";
import { t } from "i18next";

export default function SearchScreen() {
  const sportsList = [
    "Vôlei de areia",
    "Vôlei de quadra",
    "Beach Tênis",
    "Tênis",
    "FuteVôlei",
    "Futmesa",
    "Futsal",
    "Basquete",
    "Futebol Society",
  ];

  const WIDTH = Dimensions.get("window");

  const handleSportToggle = (sport) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(
        selectedSports.filter((selectedSport) => selectedSport !== sport)
      );
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const renderSportPair = (sport1, sport2, index) => (
    <View style={styles.sportPair} key={index}>
      <TouchableOpacity onPress={() => handleSportToggle(sport1)}>
        <Text
          style={[
            styles.sportText,
            selectedSports.includes(sport1) && styles.selectedSportText,
          ]}
        >
          {sport1}
        </Text>
      </TouchableOpacity>
      <View style={styles.rightSports}>
        <TouchableOpacity onPress={() => handleSportToggle(sport2)}>
          <Text
            style={[
              styles.sportText,
              selectedSports.includes(sport2) && styles.selectedSportText,
            ]}
          >
            {sport2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const { t, i18n } = useTranslation();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedSports, setSelectedSports] = useState([]);
  const [distance, setDistance] = useState(0);

  const userData = {
    username: "Fulana da Silva",
    userImage: "../../assets/user.webp",
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header username={userData.username} userImage={userData.userImage} />
      <View style={styles.filterContainer}>
        <Text style={styles.titleFilter}>{t('Filtros')}</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.titleForm}>{t('Distância Máxima:')} {distance}Km</Text>

        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>0km</Text>
          <Slider
            style={{ width: "80%", height: 40 }}
            minimumValue={0}
            maximumValue={50}
            minimumTrackTintColor="#9F5AC1"
            maximumTrackTintColor="#000000"
            thumbTintColor="tomato"
            onValueChange={(value) => setDistance(parseInt(value))}
          />
          <Text style={styles.distanceText}>50km</Text>
        </View>

        <Text style={styles.titleForm}>{t('Preço')}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>MIN</Text>
          <TextInput
            style={styles.priceInput}
            value={minPrice}
            onChangeText={setMinPrice}
            placeholder="R$"
            keyboardType="decimal-pad"
          />
          <View style={styles.line}></View>
          <Text style={styles.priceText}>MAX</Text>
          <TextInput
            style={styles.priceInput}
            value={maxPrice}
            onChangeText={setMaxPrice}
            placeholder="R$"
            keyboardType="number-pad"
          />
        </View>
        <Text style={styles.titleForm}>{t('Esportes desejados')}</Text>
        <View style={styles.sportContainer}>
          {Array.from(Array(Math.ceil(sportsList.length / 2)), (_, index) =>
            renderSportPair(sportsList[index * 2], sportsList[index * 2 + 1], index)
          )}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>{t('Buscar Arenas')}</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sportContainer: {
    height: "35%",
    marginTop: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },
  filterContainer: {
    backgroundColor: "#EBEBEB",
    width: "100%",
    height: "7%",
    justifyContent: "center",
    paddingLeft: 10,
  },
  formContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  distanceContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  titleFilter: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 30,
  },
  titleForm: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 30,
    marginTop: 20,
  },
  priceText: {
    marginLeft: 20,
    marginRight: 10,
    color: "#6A5ACD",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  priceInput: {
    width: 90,
    height: 30,
    borderColor: "#6A5ACD",
    borderRadius: 30,
    borderWidth: 2,
    fontSize: 15,
    paddingLeft: 10,
    paddingBottom: 5,
    marginRight: 20,
    alignItems: "center",
  },
  line: {
    borderBottomWidth: 3,
    borderColor: "#6A5ACD",
    width: 30,
  },
  sportText: {
    color: "black",
    fontSize: 16,
  },
  selectedSportText: {
    color: "#6A5ACD",
  },
  sportText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  distanceText: {
    fontSize: 20,
  },
  sportPair: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  rightSports: {
    width: "50%",
  },
  button: {
    width: 310,
    height: 50,
    backgroundColor: "#660099",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 20,
    alignSelf: "center"
  },
  buttonTxt: {
    color: "#F6F5F3",
    fontSize: 22,
    fontWeight: "bold",
  },
});
