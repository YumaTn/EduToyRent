import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserInfo = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    // State theo dõi lỗi
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                    <Text style={styles.info}>
                        <SimpleLineIcons name="arrow-left" size={16} color="black" /> Thông tin cá nhân
                    </Text>
                </View>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollViewContent}> 
                <View>
                    <Text style={styles.title}>Email<Text style={styles.iconMust}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUserEmail}
                        value={userEmail}
                        placeholder="Email"
                        placeholderTextColor="#CCCCCC"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={styles.title}>Name<Text style={styles.iconMust}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setUsername(text);
                            setNameError('');
                        }}
                        value={username}
                        placeholder="Name"
                        placeholderTextColor="#CCCCCC"
                    />
                    {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                </View>
                <View>
                    <Text style={styles.title}>Address<Text style={styles.iconMust}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder="Address"
                        placeholderTextColor="#CCCCCC"
                    />
                </View>
                <View>
                    <Text style={styles.title}>Phone number<Text style={styles.iconMust}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setPhone(text);
                            setPhoneError('');
                        }}
                        value={phone}
                        placeholder="Phone number"
                        placeholderTextColor="#CCCCCC"
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                    {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                </View>
                <View>
                    <Text style={styles.title}>Gender<Text style={styles.iconMust}>*</Text></Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity onPress={() => setGender('male')} style={styles.radioButtonContainer}>
                            <View style={[styles.radioButton, gender === 'male' && styles.radioButtonSelected]}>
                                {gender === 'male' && <View style={styles.innerCircle} />}
                            </View>
                            <Text style={styles.radioButtonText}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setGender('female')} style={styles.radioButtonContainer}>
                            <View style={[styles.radioButton, gender === 'female' && styles.radioButtonSelected]}>
                                {gender === 'female' && <View style={styles.innerCircle} />}
                            </View>
                            <Text style={styles.radioButtonText}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Chỉnh sửa</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 30,
    },
    info: {
        fontSize: 20,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    title: {
        marginLeft: 5,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        borderWidth: 1,
        borderColor: 'orange',
        padding: 12,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 120,
        marginRight: 120,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        backgroundColor: 'white',
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    radioButtonText: {
        marginLeft: 10,
    },
    iconMust: {
        color: 'red',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 10,
    },
    scrollViewContent: {
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 150,
        backgroundColor: '#CCCCCC',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default UserInfo;
