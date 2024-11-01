import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BotIcon } from '../../assets/icon';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Profile = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const [phone, setPhone] = useState('');

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); 
            Alert.alert('Logged out successfully');
            navigation.navigate('login');
        } catch (error) {
            console.error('Error clearing storage:', error);
            Alert.alert('Failed to log out. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.info}>Profile</Text>
                </View>
                <View>
                    <Text style={styles.fontTitle}>Tài khoản</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                        <View style={styles.information}>
                            <Text style={styles.informationText}>
                                <Ionicons name="person" size={20} color="black" /> Thông tin cá nhân
                            </Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.fontTitle}>Khác</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('History')}>
                        <View style={styles.informationOther}>
                            <Text style={styles.informationText}>
                                <FontAwesome5 name="history" size={15} color="black" /> Lịch sử thanh toán
                            </Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderTracking')}>
                        <View style={styles.informationOther}>
                            <Text style={styles.informationText}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="black" /> Order tracking
                            </Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ChatboxAl')}>
                        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row' }}>
                            <BotIcon />
                            <Text style={{ marginBottom: 10, fontSize: 16, marginTop: 10, marginLeft: 10 }}>
                                Trợ giúp
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.logoutContainer}>
                            <Text style={styles.logoutText}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 50,
        backgroundColor: '#FE3734',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        paddingBottom: 10,
    },
    info: {
        fontSize: 20,
        paddingLeft: 20,
        color: 'white',
        marginBottom: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginBottom: 10,
        marginLeft: 20,
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 20,
        backgroundColor: '#CCCCCC',
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        padding: 20,
        backgroundColor: '#CCCCCC',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    informationText: {
        fontSize: 16,
    },
    phone: {
        paddingLeft: 5,
    },
    fontTitle: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: 30,
    },
    informationOther: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        padding: 20,
        backgroundColor: '#CCCCCC',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    logoutContainer: {
        backgroundColor: '#FF6347',
        borderRadius: 5,
        padding: 10,
        margin: 20,
    },
    logoutText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        marginBottom: 20,
    },
    loginButton: {
        padding: 10,
        backgroundColor: '#FFCA09',
        borderRadius: 5,
    },
    loginButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default Profile;
