import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback, Alert, ImageBackground} from 'react-native';
import { useState } from 'react';
import  {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';




//Assets
import Zurueck from '../components/Zurueck';






function RezeptScreen({ navigation , route}){
  const [rezept, setRezept] = useState(route.params.paramKey);
  console.log("Einfügen der Parameter erfolgreich   ", route.params.paramKey);
  
    return(
      <SafeAreaView style={stylesRezept.container}>
      
      <Zurueck onPress={() =>navigation.navigate('Home')}></Zurueck>

      
        <ScrollView style = {stylesRezept.scroll}>

        
          <ImageBackground source={require('../assets/backgroundImages/Sea.jpg')}>

          <Text style={[stylesRezept.name, stylesRezept.schattenGross]}>{rezept.Name}</Text>
  
        
          <View style={[stylesRezept.semiTransparent, stylesRezept.schattenGross, {height: 260}, {marginTop: 20}, {opacity: 50}]}>
            <Image source={{uri: rezept.Bild}} style={stylesRezept.bildEssen} ></Image>
          </View>
          
          <View style={stylesRezept.eigenschaften}>
            <View style={stylesRezept.eigenschaftenObereReihe}>
              <Text style={{width: "33%", textAlign: 'center', color: 'white', fontWeight: 'bold'}} >{rezept.Zeit} min</Text>
              <Text style={{ width: "33%", textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{rezept.Kalorien} kcal</Text>
              <Text style={{width: "33%", textAlign: 'center', color: 'white', fontWeight: 'bold'}} >{rezept.Protein} g</Text>
            </View>
            
            <Text style={{width: "33%", textAlign: 'center', color: 'white', paddingTop: 10, fontWeight: 'bold'}}>{rezept.Land}</Text>
          </View>

          <View style={stylesRezept.informationen}></View>
          <View style={[stylesRezept.semiTransparent, stylesRezept.schattenGross,{marginTop: 20}]}>
            <View style={stylesRezept.zutaten}>
              <Text style={stylesRezept.Ausgabe}>{rezept.Zutat}</Text>
  
            </View> 
            <View style={stylesRezept.mengen}>
              <Text style={stylesRezept.Ausgabe}>Menge in g</Text>
            </View>
          </View>
  
  
          <View style={[stylesRezept.semiTransparent, stylesRezept.schattenGross, {marginTop: 20}, {height: 500}]}>
            <Text style={stylesRezept.Ausgabe}>{rezept.Anleitung}</Text>
          </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    );
  }

  export default RezeptScreen;

  const stylesRezept = StyleSheet.create({
    container:{
        flex: 1,
        MarginTop: Constants.statusBarHeight,
      },
      name:{
        width: '90%',
        height: 40,
        marginTop: Constants.statusBarHeight + 60,
        alignSelf: 'center',
        //Text
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
      },
    bildEssen:{
      resizeMode: 'cover',
      borderRadius: 25,
      width: '100%',
      height:'100%',
      },
    semiTransparent:{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(200,200,200,0.5)',
        borderRadius: 25,
      },
    schattenGross:{
        elevation: 10,
        shadowColor: '#000000'
      },
    zutaten:{
        height: 50,
        width: '50%',
        color: 'white',
      },
    mengen:{
        position: 'absolute',
        marginLeft: '50%',
        height: 50,
        width: '50%',
        color: 'white',
      },
    Ausgabe:{
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        color: 'rgba(255,255,255,1)'
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
      }       
  });
