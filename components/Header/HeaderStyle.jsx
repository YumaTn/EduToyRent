import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
    backgroundColor: '#FE3734',
    paddingTop: 50,
    paddingBottom:30,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1, // This allows the left icons to take up space without pushing the title
  },
  titleWrapper: {
    flex: 2, // Gives the title enough space to stay centered
    alignItems: 'center', // Centers the title
  },
  iconContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    color: 'black',
  },
  input: {
    flex: 1,
    height: 30,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginRight:50
  },
  cart: {
    paddingRight: 15,
  },
});
export default styles;
