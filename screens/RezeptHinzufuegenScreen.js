import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback,  Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { useState } from 'react';
import React from 'react';
import * as SQLite from 'expo-sqlite';


//Assets
import Zurueck from '../components/Zurueck';
import Hinzufuegen  from '../components/Hinzufuegen';
import { ZoomInLeft } from 'react-native-reanimated';




//Constants


//Import Database
const db = SQLite.openDatabase('db.rezepte');




function RezeptHinzufuegenScreen({navigation}){
  const [name, setName] = useState('N/A');
  const [bild, setBild] = useState('');
  const [zeit, setZeit] = useState('N/A');
  const [kalorien, setKalorien] = useState('N/A');
  const [protein, setProtein] = useState('N/A');
  const [land, setLand] = useState('N/A');
  const [zutat, setZutat] = useState('N/A');
  const [anleitung, setAnleitung] = useState('Kein Anleitung');


  
  //Camera/ Image Picker
  async function takePhotoAsync(){
      //alert("Take Photo");
      const {status} = await ImagePicker.requestCameraPermissionsAsync();
      const isSuccessful = status === 'granted';
      
  
      if(!isSuccessful){
        alert("Kamerazugriff nicht gestattet");
        return;
      }
    
      const image = await ImagePicker.launchCameraAsync();
      if (!image.canceled){
        //proceed with image
        console.log("Image File:", image.assets[0].uri);
        setBild(image.assets[0].uri);
      }
    } 
    async function choosePhotoAsync(){
      //alert("Choose Photo");
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const isSuccessful = status === 'granted';
    
      if(!isSuccessful){
        alert("Dateizugriff nicht gestattet");
      }
    
      const image = await ImagePicker.launchImageLibraryAsync();
      if(!image.canceled){
        //proceed with image
        console.log("Image File: ",image.assets[0].uri);
        setBild(image.assets[0].uri);
      }
    } 
    

    //RENDER
      return(
      <SafeAreaView style={stylesRezeptHinzufuegen.container}>
      
      <Zurueck onPress={() =>navigation.navigate('Home')}></Zurueck>
  
        <ScrollView style = {stylesRezeptHinzufuegen.scroll}>

         <TextInput 

          style={[stylesRezeptHinzufuegen.name, stylesRezeptHinzufuegen.schattenGross]} 
          onChangeText={(val) => setName(val)}
          placeholder="Name">

         </TextInput>


          <View style={[stylesRezeptHinzufuegen.weisserHintergrund, stylesRezeptHinzufuegen.schattenGross, {height: 260}, {marginTop: 20}]}>
            
            <TouchableWithoutFeedback onPress={() => takePhotoAsync()}>
              <Image source={require('../assets/camera100px.png')} style={stylesRezeptHinzufuegen.kameraView}/>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => choosePhotoAsync()}>
              <Image source={require('../assets/folder100px.png')} style={stylesRezeptHinzufuegen.ordnerView}/>
            </TouchableWithoutFeedback>
  
          </View>

          <View style={stylesRezeptHinzufuegen.eigenschaften}>
            <View style={stylesRezeptHinzufuegen.eigenschaftenObereReihe}>
              <TextInput style={{width: "33%", textAlign: 'center'}} placeholder= "Zeit (min)" keyboardType='numeric' onChangeText={(val) => setZeit(val)}></TextInput>
              <TextInput style={{ width: "33%", textAlign: 'center'}} placeholder="kcal" keyboardType='numeric' onChangeText={(val) => setKalorien(val)}></TextInput>
              <TextInput style={{width: "33%", textAlign: 'center'}} placeholder="Protein (g)" keyboardType='numeric' onChangeText={(val) => setProtein(val)}></TextInput>
            </View>
            
            <TextInput style={{width: "33%", textAlign: 'center', paddingTop: 10}} placeholder= "Land" onChangeText={(val) => setLand(val)}></TextInput>
          </View>
  
  
          <View style={stylesRezeptHinzufuegen.informationen}></View>
          <View style={[stylesRezeptHinzufuegen.weisserHintergrund, stylesRezeptHinzufuegen.schattenGross,{marginTop: 20}]}>
            <View style={stylesRezeptHinzufuegen.zutaten}>
              <TextInput style={stylesRezeptHinzufuegen.Eingabe} placeholder ="Zutaten" onChangeText={(val) => setZutat(val)}></TextInput>
            </View> 
            <View style={stylesRezeptHinzufuegen.mengen}>
              <TextInput style={stylesRezeptHinzufuegen.Eingabe} keyboardType='numeric' placeholder ="Menge in g (1 Person)"></TextInput>
            </View>
          </View>
  
  
          <View style={[stylesRezeptHinzufuegen.weisserHintergrund, stylesRezeptHinzufuegen.schattenGross, {marginTop: 20}, {height: 500}]}>
            <TextInput style={stylesRezeptHinzufuegen.Eingabe} placeholder = "Anleitung"  onChangeText={(val) => setAnleitung(val)}></TextInput>
          </View>
        </ScrollView>
  
        <Hinzufuegen onPress={()=>insertRezept(name,bild,zeit,kalorien,protein,land,zutat,anleitung)}></Hinzufuegen>
  
      </SafeAreaView>
    )
  }


  function insertRezept(nameN, bildN, zeitN, kalorienN, proteinN, landN, zutatN, anleitungN)
  {
    console.log(nameN, "  ", zutatN, "  ", anleitungN, "  ",bildN);
  db.transaction(tx => {

      tx.executeSql('INSERT INTO Rezepte (Name, Bild , Zeit, Kalorien, Protein, Land ,Zutat, Anleitung) values (?,?,?,?,?,?,?,?)',

        [nameN, bildN, zeitN, kalorienN, proteinN, landN, zutatN, anleitungN,],

        (tx, results) => {
          console.log(results, "   ", tx);
        },

        (tx, error) => {
          console.log("Error", error);
        }

      );
    })


    db.transaction(tx => {

      tx.executeSql('SELECT* FROM Rezepte',
  
      [],
  
      (tx,{rows}) => {
        Alert.alert("SPEICHERN ERFOLGREICH");
         for(let a = 0; a < rows.length; a++)
         {
          console.log(rows._array[a]);
         }
      },
  
      (tx,error) =>{
        console.log("Error ", error);
        Alert.alert("Error ",error);
      }
  
        )
      })
  }

  

  


  export default RezeptHinzufuegenScreen;

  const stylesRezeptHinzufuegen = StyleSheet.create({
    container:{
        flex: 1,
        MarginTop: Constants.statusBarHeight,
        backgroundColor: 'white'
      },
      name:{
        width: '90%',
        height: 70,
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight + 60,
        alignSelf: 'center',
        //Text
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        Type: 'outlined'
      },
    weisserHintergrund:{
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 25,
    },
    schattenGross:{
        elevation: 10,
        shadowColor: '#000000'
      },
    kameraView:{
      width: '50%',
      height: '100%',
      resizeMode: 'center',
    },
    ordnerView:{
      position: 'absolute',
      width: '50%',
      height: '100%',
      marginLeft: '50%',
      resizeMode: 'center',
    },
    zutaten:{
      height: 50,
      width: '50%',
    },
    mengen:{
      position: 'absolute',
      marginLeft: '50%',
      height: 50,
      width: '50%',
    },
    Eingabe:{
      textAlign: 'center',
      marginTop: 10,
    },
    scroll:{
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    eigenschaften:{
      marginTop: 20,
      width: '90%',
      alignSelf: 'center',
    },
    eigenschaftenObereReihe:{
      flexDirection: "row",
      justifyContent: 'space-between',
      alignContent: "stretch",
    },
  });