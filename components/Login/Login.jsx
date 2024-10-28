import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LogoLoginIcon, YearIcon } from '../../assets/icon';
import HeaderIcon from '../../assets/HeaderIcon.png';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.87.47.231:8000/api/v1/auth/login', {
                email,
                password,
            });
    
            if (response.data.accessToken) {
                const { _id, name } = response.data.user;
    
                // Create a single object to store all user data
                const userData = {
                    userToken: response.data.accessToken,
                    userId: _id,
                    userName: name,
                    userEmail: email,
                    userPassword: password,
                };
    
                // Store the entire user data object as a JSON string under "UserData"
                await AsyncStorage.setItem('UserData', JSON.stringify(userData));
    
                navigation.navigate('Navigation'); // Navigate to the next screen
            } else {
                Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng');
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Đăng nhập thất bại', error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại');
            } else if (error.request) {
                Alert.alert('Đăng nhập thất bại', 'Không có phản hồi từ máy chủ, vui lòng kiểm tra kết nối mạng');
            } else {
                Alert.alert('Đăng nhập thất bại', 'Đã xảy ra lỗi: ' + error.message);
            }
        }
    };
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <YearIcon />
                        <Image style={styles.headerImage} source={HeaderIcon} resizeMode="contain" />
                    </View>
                </View>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Overflower</Text>
                </View>
                <View style={styles.loginBox}>
                    <Text style={styles.title}>Đăng Nhập</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="#CCCCCC"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#CCCCCC"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Đăng Nhập</Text>
                    </TouchableOpacity>

                    <Image source={require('../../assets/Line 4.png')} style={styles.line} />
                    <TouchableOpacity style={styles.signupContainer} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: '#F7C945',
        padding: 30,
        zIndex: 10,
    },
    loginBox: {
        width: '80%',
        padding: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        top: 80,
    },
    logoContainer: {
        marginBottom: 10,
        marginLeft: 20,
        top: 80,
    },
    logoText: {
        fontSize: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 16,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginRight: 35,
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: 'black',
    },
    button: {
        backgroundColor: 'black',
        width: '80%',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    line: {
        width: '50%',
        height: 1,
    },
    signupContainer: {
        marginTop: 10,
    },
    signupText: {
        color: 'black',
        fontSize: 16,
    },
    headerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    headerImage: {
        position: 'absolute',
        width: 200,
        right: -30,
        top: -90,
    },
});
