import { StyleSheet,View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback,Button} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';


//Components
import RezeptKlein  from '../components/RezeptKlein';



//Import Database
const db = SQLite.openDatabase('db.rezepte');

// db.transaction(tx => {
//   tx.executeSql(
//     "DROP TABLE Rezepte",
//     [], 
//     (tx, result) =>
//     {
//       console.log(result);
//     } ,
//     (tx, error) => console.log(error)
    

//   )
// })

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF EXISTS Rezepte (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Zutat TEXT, Anleitung TEXT, Bild TEXT)'
  ),
  (tx,results) => {
    console.log(results)
  }
  (tx,error) => {
    console.log(error)
  }
})





function HomeScreen({ navigation }){
  const [name, setName] = useState();


  

    db.transaction(tx => {
      tx.executeSql(
        "SELECT Name FROM Rezepte WHERE id = ?",
        [2], 
        (tx, { rows }) =>
        {
          console.log("Name: ",rows._array[0].Name);
          setName(rows._array[0].Name);
        } ,
        (tx, error) => console.log(error)
        
    
      )
    })

    return(
      <SafeAreaView style={stylesHome.container}>
      <StatusBar style='auto'/>
      
      
      <TextInput style={[stylesHome.searchBar, stylesHome.schattenGross]}></TextInput>
  
      <ScrollView style={stylesHome.scrollView}>
        <RezeptKlein onPress={() =>navigation.navigate('Rezept')} rezeptName = {name}></RezeptKlein>
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