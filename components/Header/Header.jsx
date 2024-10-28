import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './HeaderStyle';
const Header = ({navigation}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  const hideSearch = () => {
    setSearchVisible(false);
    Keyboard.dismiss(); 
  };

  return (
    <TouchableWithoutFeedback onPress={hideSearch}>
      <View style={styles.container}>
        {searchVisible ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tìm kiếm"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              autoFocus={true}
              onBlur={hideSearch}
            />
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <View style={styles.leftIcons}>
              <TouchableOpacity onPress={() => setSearchVisible(true)} style={styles.iconContainer}>
                <Ionicons name="search" size={24} color="black" style={styles.icon} />
              </TouchableOpacity>
            </View>

            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Overflower</Text>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Cart')}>
              <AntDesign name="shoppingcart" size={24} color="black" />
            </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
