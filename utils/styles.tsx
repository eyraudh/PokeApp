import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexgrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  largeImageContainer: {
    width: 300,
    height: 300,
  },
  infosContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  infos: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexgrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  }
});

export default styles
