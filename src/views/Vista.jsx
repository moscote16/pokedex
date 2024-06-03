import React, { useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFetch } from '../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgUri } from 'react-native-svg'

const Vista = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, errors } = useFetch('pokemon', page);
  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const handlePokemonPress = (pokemonId, pokemonName) => {
    navigation.navigate('PokemonDetail', { pokemonId, pokemonName });
  };

  const renderItem = ({ item }) => {
    const pokemonId = item.url.split('/').slice(-2)[0]; 
    const imageUri=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`

    
    const pokemonNameCapitalized = item.name.charAt(0).toUpperCase() + item.name.slice(1);

    return (
      <TouchableOpacity style={styles.item} onPress={() => handlePokemonPress(pokemonId, item.name)}>
      <SvgUri
      width= {100}
      height= {100}
      uri={`${imageUri}`}
      ></SvgUri>
        <Text style={styles.name}>{pokemonNameCapitalized}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={2} 
      />
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => setPage((prev) => Math.max(prev - 1, 1))}>
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{page}</Text>
        <TouchableOpacity onPress={() => setPage((prev) => prev + 1)}>
          <Icon name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'black',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textTransform: 'capitalize', 
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#444',
  },
  pageNumber: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Vista;
