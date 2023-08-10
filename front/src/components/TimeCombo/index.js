import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const TimeComboBox = ({ placeholder, onSelect, disabled }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const generateTimes = () => {
    const times = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        times.push(formattedTime);
      }
    }
    return times;
  };

  const times = generateTimes();

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setModalVisible(false);
    onSelect(time);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.comboBox, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.selectedText, disabled && styles.disabledText]}>
          {selectedTime ? selectedTime : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={times}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleTimeSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  comboBox: {
    borderWidth: 1,
    borderColor: '#6A5ACD',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 2,
    height: 40,
    width: 70,
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
  },
  selectedText: {
    color: 'black',
  },
  disabledText: {
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    width: 250,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  optionText: {
    fontSize: 25,
    color: 'black',
  },
});

export default TimeComboBox;
