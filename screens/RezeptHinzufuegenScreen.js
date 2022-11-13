import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import * as SQLite from 'expo-sqlite';


//Assets
import Zurueck from '../components/Zurueck';

//Constants
const dbRezept = SQLite.openDatabase(
  {
    name: 'Rezepte',
    location: 'default',
  },
  ()=>{},
  error => {console.log(error)}
); 

const createTable = () => {
  dbRezept.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS"
      +"Rezepte"
      +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Anleitung TEXT);"
    )
  })
}

var name;
var anleitung;




function RezeptHinzufuegenScreen({navigation}){
  createTable();
    return(
      <SafeAreaView style={stylesRezeptHinzufuegen.container}>
      
      <Zurueck onPress={() =>navigation.navigate('Home')}></Zurueck>
  
        <ScrollView style = {stylesRezeptHinzufuegen.scroll}>

         <TextInput style={[stylesRezeptHinzufuegen.name, stylesRezeptHinzufuegen.schattenGross]} onChangeText={(text) => name = text}> Name </TextInput>

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
              <TextInput style={stylesRezeptHinzufuegen.Eingabe}>Zutaten</TextInput>
            </View> 
            <View style={stylesRezeptHinzufuegen.mengen}>
              <TextInput style={stylesRezeptHinzufuegen.Eingabe}>Menge in g {"\n"} (1 Person)</TextInput>
            </View>
          </View>
  
  
          <View style={[stylesRezeptHinzufuegen.weisserHintergrund, stylesRezeptHinzufuegen.schattenGross, {marginTop: 20}, {height: 500}]}>
            <TextInput style={stylesRezeptHinzufuegen.Eingabe} onChangeText={(text) => anleitung = text}>Anleitung</TextInput>
          </View>
        </ScrollView>
  
        <TouchableWithoutFeedback onPress={() => addRezept()}>
        <View style={[stylesRezeptHinzufuegen.rezeptHinzufuegen, stylesRezeptHinzufuegen.schattenGross]}>
          <Image source={require('../assets/Plus100px.png')} style={stylesRezeptHinzufuegen.plus}></Image>
        </View>
        </TouchableWithoutFeedback>
  
      </SafeAreaView>
    )
  }

  async function addRezept(){
    try {
    await dbRezept.transaction( (tx) => {
        tx.executeSql(
        "INSERT INTO Rezepte (Name, Anleitung) VALUES (?,?)",
        [name, anleitung]
      );
    })
    }
    catch (error) {
      console.log(error);
    }
  }
  
  async function takePhotoAsync(){
    //alert("Take Photo");
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    const isSuccessful = status === 'granted';
  
    if(!isSuccessful){
      alert("Kamera nicht gestattet");
      return;
    }
  
    const image = await ImagePicker.launchCameraAsync();
    if (!image.canceled){
      //proceed with image
    }
  } 
  async function choosePhotoAsync(){
    //alert("Choose Photo");
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const isSuccessful = status === 'granted';
  
    if(!isSuccessful){
      alert("Dateizugriff nicht gestattet");
      return;
    }
  
    const image = await ImagePicker.launchImageLibraryAsync();
    if(!image.canceled){
      //proceed with image
    }
  } 

  export default RezeptHinzufuegenScreen;

  const stylesRezeptHinzufuegen = StyleSheet.create({
    container:{
        flex: 1,
        MarginTop: Constants.statusBarHeight,
      },
      name:{
        //position: 'absolute',
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