import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = useCallback(async () => {
    try {
      const storedItems = await AsyncStorage.getItem('flowerDetails');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          setCartItems(parsedItems);
        } else {
          setCartItems([parsedItems]);
        }
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const saveCartItemsToStorage = async (items) => {
    try {
      await AsyncStorage.setItem('flowerDetails', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => {
      const itemTotalPrice = item.price * (item.quantity || 1);
      item.totalPrice = itemTotalPrice; 
      return sum + itemTotalPrice;
    }, 0);
  }, [cartItems]);

  const increaseQuantity = useCallback((index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = (updatedItems[index].quantity || 1) + 1;
    setCartItems(updatedItems);
    saveCartItemsToStorage(updatedItems);
  }, [cartItems]);

  const decreaseQuantity = useCallback((index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setCartItems(updatedItems);
      saveCartItemsToStorage(updatedItems);
    } else {
      removeItem(index);
    }
  }, [cartItems]);

  const removeItem = useCallback((index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    saveCartItemsToStorage(updatedItems);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }
  
    try {
      const userData = await AsyncStorage.getItem('UserData');
      const { userId } = userData ? JSON.parse(userData) : {};
  
      if (!userId) {
        Alert.alert('Không tìm thấy người dùng', 'Vui lòng đăng nhập để tiếp tục thanh toán.');
        return;
      }
  
      const checkoutPromises = cartItems.map(async (item) => {
        try {
          const response = await axios.post(
            'http://10.87.47.231:8000/api/v1/orders',
            {
              buyerId: userId,
              flowerId: item.flowerId,
              quantity: item.quantity || 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(`Order response for item ${item.flowerId}:`, response.data);
          return response.data;
        } catch (error) {
          console.error(`Error processing item ${item.flowerId}:`, error.response?.data || error.message);
          return { success: false };
        }
      });
  
      const results = await Promise.all(checkoutPromises);
      console.log('Checkout results:', results); 
  
      if (results.every(result => result._id)) {
        Alert.alert('Thành công', 'Đơn hàng của bạn đã được đặt thành công!');
        setCartItems([]);
        await AsyncStorage.removeItem('flowerDetails');
      } else {
        console.log('Danh sách đơn hàng thất bại:', results.filter(result => !result._id));
        Alert.alert('Thanh toán thất bại', 'Một hoặc nhiều đơn hàng không thành công. Vui lòng thử lại.');
      }      
    } catch (error) {
      console.error('Checkout process error:', error);
      Alert.alert('Thanh toán thất bại', 'Có lỗi trong quá trình xử lý yêu cầu của bạn.');
    }
  };
  
  
  

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: `http://10.87.47.231:8000/${item.imageUrl}` }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(index)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity || 1}</Text>
        <TouchableOpacity style={styles.button} onPress={() => increaseQuantity(index)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    saveCartItemsToStorage(cartItems);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.flowerId.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${calculateTotalPrice().toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FE3734',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#FE3734',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#FE3734',
  },
  backButton: {
    padding: 10,
  },
  checkoutButton: {
    backgroundColor: '#FE3734',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE3734',
  },
});
