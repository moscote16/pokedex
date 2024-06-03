import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useFetch } from '../hooks/useFetch';
import { SvgUri } from 'react-native-svg'

const PokemonDetail = ({ route }) => {
  const { pokemonId, pokemonName } = route.params;
  const { data: pokemonInfo, isLoading, errors } = useFetch(`pokemon/${pokemonId}`);
  const [showDetails, setShowDetails] = useState({
    height: false,
    weight: false,
    baseExperience: false,
    types: false,
    abilities: false,
    stats: false,
  });

  const getBackgroundColor = (types) => {
    const typeColors = {
      grass: '#78C850',
      fire: '#F08030',
      water: '#6890F0',
      bug: '#A8B820',
      normal: '#e093a0',
      flying: '#A890F0',
      electric: '#F8D030',
      ground: '#E0C068',
      poison: '#A040A0',
      fighting: '#C03028',
      psychic: '#F85888',
      rock: '#B8A038',
      ice: '#98D8D8',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    for (let type of types) {
      if (typeColors[type.type.name]) {
        return typeColors[type.type.name];
      }
    }

    return '#2c2c2c';
  };

  const toggleDetails = (key) => {
    setShowDetails(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: pokemonInfo ? getBackgroundColor(pokemonInfo.types) : '#2c2c2c' }]}>
      {pokemonInfo && (
        <>
           <SvgUri
        width= {200}
        height= {250}
        uri={pokemonInfo.sprites.other.dream_world.front_default}></SvgUri>
          <Text style={styles.name}>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</Text>
          <TouchableOpacity onPress={() => toggleDetails('height')}>
            <Text style={styles.label}>Height:</Text>
            {showDetails.height && <Text style={styles.info}>{pokemonInfo.height}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleDetails('weight')}>
            <Text style={styles.label}>Weight:</Text>
            {showDetails.weight && <Text style={styles.info}>{pokemonInfo.weight}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleDetails('baseExperience')}>
            <Text style={styles.label}>Base Experience:</Text>
            {showDetails.baseExperience && <Text style={styles.info}>{pokemonInfo.base_experience}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleDetails('types')}>
            <Text style={styles.label}>Types:</Text>
            {showDetails.types && <Text style={styles.info}>{pokemonInfo.types.map(typeInfo => typeInfo.type.name).join(', ')}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleDetails('abilities')}>
            <Text style={styles.label}>Abilities:</Text>
            {showDetails.abilities && <Text style={styles.info}>{pokemonInfo.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleDetails('stats')}>
            <Text style={styles.label}>Stats:</Text>
            {showDetails.stats && pokemonInfo.stats.map(statInfo => (
              <Text key={statInfo.stat.name} style={styles.info}>{statInfo.stat.name}: {statInfo.base_stat}</Text>
            ))}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  info: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
});

export default PokemonDetail;
