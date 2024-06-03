import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Juego from '../views/Juego';
 

const Menu = ({ isVisible, onClose }) => {
  const navigation = useNavigation(); 

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.menu}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menú</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Juego'); 
          }}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>¿Quién es este pokemon?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#000',
    padding: 20,
    elevation: 4,
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Menu;
