import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';

const ClientHome = () => {
  const userData = {
    username: 'Fulana da Silva',
    userImage: '../../assets/user.webp',
  };

  const exportCentersData = [
    { id: 1, image: '../../assets/qdr1.jpg' },
    { id: 2, image: '../../assets/qdr2.jpg' },
    { id: 3, image: '../../assets/qdr3.jpg' },
    // Adicione mais dados de centros exportivos conforme necessário
  ];

  const reservationsData = [
    { id: 1, image: '../../assets/qdr1.jpg' },
    { id: 2, image: '../../assets/qdr2.jpg' },
    // Adicione mais dados de reservas conforme necessário
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header username={userData.username} userImage={userData.userImage} />
      <Carousel data={exportCentersData} />
      <Carousel data={reservationsData} />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ClientHome;