import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback,  Alert, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { useState } from 'react';

import * as SQLite from 'expo-sqlite';


//Assets
import Zurueck from '../components/Zurueck';
import { State } from 'react-native-gesture-handler';
import React from 'react';

//Constants


//Import Database
const db = SQLite.openDatabase('db.rezepte');




function RezeptHinzufuegenScreen({navigation}){
  const [name, setName] = useState('');
  const [zutat, setZutat] = useState('Default Zutat');
  const [anleitung, setAnleitung] = useState('Default Anleitung bla bla bla');
  const [bild, setBild] = useState();

  
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
  
        <TouchableWithoutFeedback onPress={()=>insertRezept(name,zutat,anleitung,bild)}>
        <View style={[stylesRezeptHinzufuegen.rezeptHinzufuegen, stylesRezeptHinzufuegen.schattenGross]}>
          <Image source={require('../assets/Plus100px.png')} style={stylesRezeptHinzufuegen.plus}></Image>
        </View>
        </TouchableWithoutFeedback>
  
      </SafeAreaView>
    )
  }


  function insertRezept(nameN, zutatN, anleitungN, bildN)
  {
    console.log(nameN, "  ", zutatN, "  ", anleitungN, "  ",bildN);
  db.transaction(tx => {

      tx.executeSql('INSERT INTO Rezepte (Name, Zutat, Anleitung, Bild) values (?,?,?,?)',

        [nameN, zutatN, anleitungN, bildN],

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

  

  
  



  // async function takePhotoAsync(){
  //   //alert("Take Photo");
  //   const {status} = await ImagePicker.requestCameraPermissionsAsync();
  //   const isSuccessful = status === 'granted';
    

  //   if(!isSuccessful){
  //     alert("Kamerazugriff nicht gestattet");
  //     return;
  //   }
  
  //   const image = await ImagePicker.launchCameraAsync();
  //   if (!image.canceled){
  //     //proceed with image
  //     console.log("Image File:", image.assets[0].uri);
  //     return image.assets[0].uri;
  //   }
  // } 
  // async function choosePhotoAsync(){
  //   //alert("Choose Photo");
  //   const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   const isSuccessful = status === 'granted';
  
  //   if(!isSuccessful){
  //     alert("Dateizugriff nicht gestattet");
  //   }
  
  //   const image = await ImagePicker.launchImageLibraryAsync();
  //   if(!image.canceled){
  //     //proceed with image
  //     console.log("Image File: ",image.assets[0].uri);
  //     return image.assets[0].uri;
  //   }
  // } 

  export default RezeptHinzufuegenScreen;

  const stylesRezeptHinzufuegen = StyleSheet.create({
    container:{
        flex: 1,
        MarginTop: Constants.statusBarHeight,
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