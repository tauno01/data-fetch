import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import useAbortableFetch from './hooks/useAbortableFetch';

const URL = 'https://api.spoonacular.com/recipes/findByNutrients'
const API_KEY = ''

export default function App() {
  const [minCarbs, setMinCarbs] = useState('');
  const [maxCarbs, setMaxCarbs] = useState('');
  const [fetchUrl, setFetchUrl] = useState('');
  const { json: foods, loading, error } = useAbortableFetch(fetchUrl);

  const fetchFoods = () => {
    const url = `${URL}?minCarbs=${minCarbs}&maxCarbs=${maxCarbs}&apiKey=${API_KEY}`;
    setFetchUrl(url);
  };

  return (
    <View style={styles.container}>
      <Text>Enter minimum and maximum carbs</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Min Carbs"
        keyboardType="numeric"
        value={minCarbs}
        onChangeText={setMinCarbs}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Max Carbs"
        keyboardType="numeric"
        value={maxCarbs}
        onChangeText={setMaxCarbs}
      />

      <Button title="Fetch Foods" onPress={fetchFoods} />

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodTitle}>{item.title}</Text>
            <Text style={styles.foodCarbs}>Carbs: {item.carbs}g</Text>
          </View>
        )}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
