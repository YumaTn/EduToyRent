import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Noti = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.info}>Notification</Text>
      </View> 
    </View>
  )
}

export default Noti

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 50,
    backgroundColor: '#FE3734',
    paddingBottom: 10,
    borderBottomWidth:1,
    borderColor:'#CCCCCC'
  },
  info: {
    fontSize: 20,
    paddingLeft: 20,
    color:'white',
    fontWeight:'bold', 
    marginBottom:18, 
  }, 
})