import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const numColumns = 2;

  useEffect(() => {
    axios.get('http://10.87.47.231:8000/api/v1/flowers')
      .then((response) => {
        setFlowers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Render each item in the flower list
  const renderItem = ({ item }) => {
    const productWidth = width / numColumns - 16;

    return (
      <TouchableOpacity
        style={[styles.productContainer, { width: productWidth }]}
        onPress={() => {
          navigation.navigate('FlowerDetail', { id: item._id });
        }}
      >
        <Image source={{ uri: `http://10.87.47.231:8000/${item.imageUrl}` }} style={styles.productImage} />
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productType}>{item.type}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        <View style={styles.priceConditionContainer}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productCondition}>{item.condition}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={flowers}
        keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    margin: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productType: {
    fontSize: 14,
    color: '#888',
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  priceConditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#FE3734',
  },
  productCondition: {
    fontSize: 12,
    color: '#666',
  },
  row: {
    justifyContent: 'space-between',
  },
});
