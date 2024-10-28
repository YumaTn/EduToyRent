import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlowerReviewDetail from './FlowerReviewDetail';

const FlowerDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://10.87.47.231:8000/api/v1/flowers/${id}`)
      .then((response) => {
        setFlower(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleBuyNow = async () => {
    if (flower) {
      try {
        const flowerDetails = {
          flowerId: flower._id,
          name: flower.name,
          price: flower.price,
          imageUrl: flower.imageUrl,
        };
  
        // Lấy hoa đã lưu trong AsyncStorage
        const existingFlowers = await AsyncStorage.getItem('flowerDetails');
        let flowersArray = existingFlowers ? JSON.parse(existingFlowers) : [];
        const flowerIndex = flowersArray.findIndex(item => item.flowerId === flower._id);
        if (flowerIndex === -1) {
          flowersArray.push(flowerDetails);
        } else {
          flowersArray[flowerIndex] = flowerDetails;
        }
  
        // Lưu lại mảng hoa vào AsyncStorage
        await AsyncStorage.setItem('flowerDetails', JSON.stringify(flowersArray));
        Alert.alert('Thành công', 'Đã thêm vào giỏ hàng thành công!');
      } catch (error) {
        console.error('Lỗi khi lưu chi tiết hoa:', error);
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i <= rating ? "star" : "star-border"}
          size={20}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons style={{ marginLeft: 10 }} name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {flower ? (
            <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
              {flower.name}
            </Text>
          ) : (
            <Text>No product found</Text>
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: `http://10.87.47.231:8000/${flower.imageUrl}` }} style={styles.image} />
        <Text style={styles.name}>{flower.name}</Text>
        <View style={styles.mediumRatingContainer}>
          {renderStars(flower.mediumRating)}<Text>({flower.mediumRating})</Text>
        </View>
        <Text style={styles.type}>Type: {flower.type}</Text>
        <Text style={styles.quantity}>Quantity: {flower.quantity}</Text>
        <Text style={styles.price}>Price: ${flower.price}</Text>
        <Text style={styles.condition}>Condition: {flower.condition}</Text>
        <Text style={styles.description}>{flower.description}</Text>
        <Text style={styles.seller}>Seller: {flower.sellerId.name}</Text>
        <FlowerReviewDetail id={id}/>

        {/* Hiển thị nút "Buy Now" hoặc "Đã hết hàng" */}
        {flower.quantity > 0 ? (
          <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.outOfStockButton]} disabled>
            <Text style={styles.buttonText}>Đã hết hàng</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

export default FlowerDetail;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  type: {
    fontSize: 16,
    color: '#888',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    color: '#FE3734',
    marginTop: 4,
  },
  condition: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  mediumRatingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  seller: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#FE3734',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FE3734',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 5,
  },
  outOfStockButton: {
    backgroundColor: '#cccccc', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
