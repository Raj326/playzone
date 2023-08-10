import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import TimeComboBox from "../TimeCombo";

const DaySchedule = () => {
  const [days, setDays] = useState([
    { day: "Segunda-feira", open: "", close: "", closed: false },
    { day: "Terça-feira", open: "", close: "", closed: false },
    { day: "Quarta-feira", open: "", close: "", closed: false },
    { day: "Quinta-feira", open: "", close: "", closed: false },
    { day: "Sexta-feira", open: "", close: "", closed: false },
    { day: "Sábado", open: "", close: "", closed: false },
    { day: "Domingo", open: "", close: "", closed: false },
  ]);

  const handleToggleClosed = (index) => {
    const updatedDays = [...days];
    updatedDays[index].closed = !updatedDays[index].closed;
    setDays(updatedDays);
  };

  const renderDay = (day, index) => {
    return (
      <View key={index} style={styles.dayContainer}>
        <Text style={styles.dayText}>{day.day}</Text>
        <View comboContainer style={styles.comboContainer}>
          {day.closed ? (
            <Text style={styles.closedText}>Fechado</Text>
          ) : (
            <>
              <TimeComboBox
                placeholder="Abre"
                selectedValue={day.open}
                onSelect={(value) => handleTimeSelect(index, "open", value)}
                disabled={day.closed}
              />
              <TimeComboBox
                placeholder="Fecha"
                selectedValue={day.close}
                onSelect={(value) => handleTimeSelect(index, "close", value)}
                disabled={day.closed}
              />
            </>
          )}
        </View>
        <TouchableOpacity onPress={() => handleToggleClosed(index)}>
          {day.closed ? (
            <Image
              source={require("../../assets/check.png")}
              style={styles.icon}
            />
          ) : (
            <Image source={require("../../assets/X.png")} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const handleTimeSelect = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  return (
    <View style={styles.container}>
      {days.map((day, index) => renderDay(day, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayText: {
    flex: 1,
    fontWeight: "bold",
  },
  icon: {
    width: 20,
    height: 20,
  },
  combo: {
    width: 300,
    backgroundColor: "red",
  },
  closedText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  comboContainer: {
    flexDirection: "row",
    width: '60%',
    justifyContent: "space-around"
  },
});

export default DaySchedule;
