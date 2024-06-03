import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Vista from './src/views/Vista';
import PokemonDetail from './src/views/PokemonDetail';
import Menu from './src/components/Menu';
import Juego  from './src/views/Juego';



const Stack = createStackNavigator();

export default function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false); 

  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Vista">
          <Stack.Screen
            name="Vista"
            component={Vista}
            options={({ navigation }) => ({
              title: 'Pokedex',
              headerLeft: () => (
                <TouchableOpacity onPress={() => setIsMenuVisible(true)} style={styles.menuButton}>
                  <Ionicons name="menu" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="PokemonDetail"
            component={PokemonDetail}
            options={{ title: 'Detalle del Pokémon' }}
          />
            <Stack.Screen
            name="Juego"
            component={Juego}  
            options={{ title: 'Juego' }}
          />
        </Stack.Navigator>
        <Menu isVisible={isMenuVisible} onClose={() => setIsMenuVisible(false)} /> 
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 15,
  },
});
