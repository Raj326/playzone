import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  ScrollView,
} from "react-native";
import "../../utils/i18n";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import NearCenterCarousel from "../../components/NearCenterCarousel";
import Footer from "../../components/Footer";
import centerData from "../../utils/centerData";
import reservationData from "../../utils/reservationData";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ClientHome = () => {
  const { t, i18n } = useTranslation();
  const userData = {
    username: "Rajneesh Bonitão",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header username={userData.username} userImage={userData.userImage} />
        <View style={styles.addressView}>
          <Image
            source={require("../../assets/localizacao.png")}
            style={styles.icon}
          />
          <Text style={styles.addressText}>Recife, PE</Text>
        </View>

        <Text style={styles.titleText}>{t('Centros Esporivos')}</Text>
        <Text style={styles.littleText}>{t('Próximos a você')}</Text>

        <NearCenterCarousel data={centerData} />

        <View style={styles.reservationView}>
          <Image
            source={require("../../assets/calendar.png")}
            style={styles.icon}
          />
          <Text style={styles.reservationText}>{t('Minhas Reservas')}</Text>
        </View>

        <Carousel data={reservationData} />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addressView: {
    width: WIDTH,
    height: HEIGHT * 0.09,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  icon: {
    width: "15%",
    height: "80%",
    marginLeft: WIDTH * 0.05,
    marginTop: WIDTH * 0.02,
    marginBottom: WIDTH * 0.02,
  },
  addressText: {
    fontSize: WIDTH * 0.05,
    fontWeight: "bold",
    marginLeft: WIDTH * 0.02,
  },
  titleText: {
    fontSize: WIDTH * 0.07,
    marginTop: HEIGHT * 0.02,
    marginLeft: WIDTH * 0.05,
    color: "#070707",
  },
  littleText: {
    fontSize: WIDTH * 0.04,
    marginLeft: WIDTH * 0.05,
    color: "#660099",
  },
  reservationView: {
    width: WIDTH,
    height: HEIGHT * 0.09,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    flexDirection: "row",
  },
  reservationText: {
    fontSize: WIDTH * 0.05,
    fontWeight: "bold",
    marginLeft: WIDTH * 0.02,
    alignSelf: "center",
    marginLeft: WIDTH * 0.1,
  },
});

export default ClientHome;
