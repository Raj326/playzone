import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Text,
} from "react-native";

import "../../utils/i18n";
import { useTranslation } from "react-i18next";

import data from "../../utils/data";
import CourtCarousel from "../../components/CourtCarousel";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const CourtChoice = () => {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState(
    "https://polyesportiva.com.br//storage/app/uploads/gR5SlTUKkRd5EvMCdI9txR5MYvIk5rqXHL03QIkG.jpeg"
  );
  const [days, setDays] = useState([
    { day: i18n.t("Segunda-feira"), open: "", close: "", closed: true },
    { day: i18n.t("Terça-feira"), open: "", close: "", closed: true },
    { day: i18n.t("Quarta-feira"), open: "", close: "", closed: true },
    {
      day: i18n.t("Quinta-feira"),
      open: "09:00",
      close: "20:00",
      closed: false,
    },
    {
      day: i18n.t("Sexta-feira"),
      open: "09:00",
      close: "22:00",
      closed: false,
    },
    { day: i18n.t("Sábado"), open: "09:00", close: "22:00", closed: false },
    { day: i18n.t("Domingo"), open: "09:00", close: "20:00", closed: false },
  ]);

  const renderDays = (day, index) => {
    return (
      <View key={index} style={styles.dayContainer}>
        <Text style={styles.dayText}>{day.day}</Text>
        <View comboContainer style={styles.comboContainer}>
          {day.closed ? (
            <Text style={styles.closedText}>{t("Fechado")}</Text>
          ) : (
            <>
              <Text style={styles.operationTxt}>
                {day.open} - {day.close}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.centerImage}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <Text style={styles.centerName}>Arena Fictícia</Text>
        <View style={styles.ratingView}>
          <Image
            source={require("../../assets/estrela.png")}
            style={styles.iconStar}
          />
          <Text style={styles.ratingText}>4.9</Text>
        </View>
        <View style={styles.divisor}></View>

        <Text style={styles.text}>Endereço</Text>

        <View style={styles.addresView}>
          <Image
            source={require("../../assets/localizacao.png")}
            style={styles.iconLocal}
          />
          <View style={styles.addresTextView}>
            <Text style={styles.addressNameTxt}>
              Nome completo da rua, número - Bairro
            </Text>
            <Text style={styles.addressNameTxt}>Cidade - UF</Text>
          </View>
        </View>
      
        <Text style={styles.text}>Funcionamento</Text>

        {days.map((day, index) => renderDays(day, index))}

        <View style={styles.CourtTextView}>
          <Text style={styles.courtText}>Quadras</Text>
        </View>
       <CourtCarousel data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourtChoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  centerImage: {
    flex: 1,
    height: HEIGHT * 0.3,
    width: WIDTH,
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  centerName: {
    fontSize: HEIGHT * 0.04,
    fontWeight: "bold",
    marginLeft: WIDTH * 0.05,
    marginTop: WIDTH * 0.02,
  },
  ratingView: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: WIDTH * 0.05,
    color: "#FFC309",
    marginLeft: WIDTH * 0.01,
    marginTop: WIDTH * 0.01,
  },
  iconStar: {
    width: WIDTH * 0.06,
    height: WIDTH * 0.06,
    marginLeft: WIDTH * 0.05,
    marginTop: WIDTH * 0.02,
    marginBottom: WIDTH * 0.02,
  },
  divisor: {
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderBottomWidth: WIDTH * 0.005,
    borderBottomColor: "black",
  },
  text: {
    fontSize: HEIGHT * 0.025,
    fontWeight: "bold",
    marginLeft: WIDTH * 0.05,
    marginTop: WIDTH * 0.02,
  },
  addresView: {
    flexDirection: "row",
  },
  iconLocal: {
    width: WIDTH * 0.1,
    height: WIDTH * 0.1,
    marginLeft: WIDTH * 0.05,
    marginTop: WIDTH * 0.02,
    marginBottom: WIDTH * 0.02,
  },
  addressNameTxt: {
    fontSize: WIDTH * 0.035,
  },
  addresTextView: {
    marginLeft: WIDTH * 0.02,
    marginTop: WIDTH * 0.02,
  },
  dayContainer: {
    flexDirection: "row",
    marginTop: HEIGHT * 0.01,
    marginLeft: WIDTH * 0.1,
  },
  dayText: {
    flex: 1,
    fontSize: WIDTH * 0.035,
  },
  closedText: {
    color: "red",
    fontWeight: "bold",
    fontSize: WIDTH * 0.035,
  },
  operationTxt: {
    fontSize: WIDTH * 0.035,
  },
  comboContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
  },
  CourtTextView: {
    width: WIDTH,
    height: HEIGHT * 0.08,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: HEIGHT * 0.01,
  },
  courtText: {
    fontSize: HEIGHT * 0.035,
    fontWeight: "bold",
  },
});
