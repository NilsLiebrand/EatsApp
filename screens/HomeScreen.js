import { StyleSheet,View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback,Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';


//Components
import RezeptKlein  from '../components/RezeptKlein';



//Import Database
const db = SQLite.openDatabase('db.rezepte');

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Rezepte (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Anleitung TEXT)'
  ),
  (tx,results) => {
    console.log(results)
  }
})

console.log("h");

db.transaction(tx => {

  tx.executeSql('INSERT INTO Rezepte (Name, Anleitung) values (?, ?)',

  ["Hallo","HUIU"],

  (tx,results) => {
    console.log("Was Succesfull");
  },

  (tx,error) =>{
    console.log("Error", error);
  }

  )
})


db.transaction(tx => {
  tx.executeSql(
    "SELECT Name FROM Rezepte",
    [], 
    (tx, { rows }) => console.log(rows._array),
    (tx, error) => console.log(error)
    

  )
})


function HomeScreen({ navigation }){



    return(
      <SafeAreaView style={stylesHome.container}>
      <StatusBar style='auto'/>
      
  
      
      <TextInput style={[stylesHome.searchBar, stylesHome.schattenGross]}></TextInput>
  
      <ScrollView style={stylesHome.scrollView}>
        
        <RezeptKlein onPress={() =>navigation.navigate('Rezept')} rezeptName='Chicken Tikka'></RezeptKlein>
        <RezeptKlein onPress={() =>navigation.navigate('Rezept')}></RezeptKlein>
        <RezeptKlein onPress={() =>navigation.navigate('Rezept')}></RezeptKlein>
        
        
      </ScrollView>
      <TouchableWithoutFeedback onPress={() =>navigation.navigate('RezeptHinzufuegen')}>
        <View style={[stylesHome.rezeptHinzufuegen, stylesHome.schattenGross]}>
          <Image source={require('../assets/Plus100px.png')} style={stylesHome.plus}></Image>
        </View>
      </TouchableWithoutFeedback>
      
      
      </SafeAreaView>
    );
  }






  export default HomeScreen;

  const stylesHome = StyleSheet.create({
    container:{
      flex: 1,
      MarginTop: Constants.statusBarHeight,
    },
    searchBar:{
      position: 'absolute',
      width: '90%',
      height: 70,
      zIndex: 2,
      backgroundColor: 'white',
      borderRadius: 100,
      justifyContent: 'center',
      marginTop: Constants.statusBarHeight,
      alignSelf: 'center',
      //Text
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
    },
    scrollView: {
      paddingTop: 120,
      //backgroundColor: '#fff',
      zIndex: 1,
    },
    schattenGross:{
      elevation: 10,
      shadowColor: '#000000'
    },
    rezeptHinzufuegen:{
      position: 'absolute',
      width: '90%',
      height: 70,
      borderRadius: 100,
      alignItems: 'center',
      backgroundColor: '#4ECAFF',
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: 20,
      zIndex: 2,
    },
    plus:{
      resizeMode: 'center',
    }
  });