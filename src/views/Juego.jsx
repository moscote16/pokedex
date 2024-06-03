import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';

const Juego = ({ navigation }) => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [correctPokemonIndex, setCorrectPokemonIndex] = useState(null);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRandomPokemons();
  }, []);

  const loadRandomPokemons = async () => {
    const randomIds = [];
    while (randomIds.length < 4) {
      const randomId = Math.floor(Math.random() * 151) + 1; 
      if (!randomIds.includes(randomId)) {
        randomIds.push(randomId);
      }
    }
    setPokemonIds(randomIds);
    setCorrectPokemonIndex(Math.floor(Math.random() * 4));

    const fetchedPokemonData = await Promise.all(
      randomIds.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
      })
    );

    setPokemonData(fetchedPokemonData);
    setIsLoading(false);
  };

  const handlePress = (index) => {
    setSelectedPokemonIndex(index);
    setIsRevealed(true);
    const message = index === correctPokemonIndex ? '¡Correcto!' : 'Incorrecto. Intenta de nuevo.';
    Alert.alert('Resultado', message);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const correctPokemon = pokemonData[correctPokemonIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Quién es este pokemon?</Text>
      <View style={styles.imageContainer}>
        {correctPokemon && correctPokemon.sprites && correctPokemon.sprites.other && correctPokemon.sprites.other['official-artwork'] && (
          <Image
            source={{ uri: correctPokemon.sprites.other['official-artwork'].front_default }}
            style={isRevealed ? styles.revealed : styles.hidden}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {pokemonData.map((pokemon, index) => (
          <TouchableOpacity
            key={pokemon.id}
            style={styles.button}
            onPress={() => handlePress(index)}
            disabled={isRevealed}
          >
            <Text style={styles.buttonText}>{pokemon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isRevealed && (
        <TouchableOpacity style={styles.resetButton} onPress={() => {
          setIsRevealed(false);
          setSelectedPokemonIndex(null);
          setIsLoading(true);
          loadRandomPokemons();
        }}>
          <Text style={styles.resetButtonText}>Reiniciar Juego</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  imageContainer: {
    width: 200,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4B0082',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  hidden: {
    width: 200,
    height: 200,
    tintColor: '#000', 
  },
  revealed: {
    width: 200,
    height: 200,
    tintColor: null, 
  },
});

export default Juego;
