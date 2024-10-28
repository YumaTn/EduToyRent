import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import NavigationOrderTracking from './NavigationOrderTracking';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const OrderTracking = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.info}>Order Tracking</Text>
            </View>
            <NavigationOrderTracking />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#FE3734',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    backButton: {
        marginRight: 15,
    },
    info: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
});

export default OrderTracking;
