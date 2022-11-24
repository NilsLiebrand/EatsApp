import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback, Alert, ImageBackground} from 'react-native';
import  {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';




//Assets
import Zurueck from '../components/Zurueck';








function RezeptScreen({ navigation }){
    return(
      <SafeAreaView style={stylesRezept.container}>
      
      <Zurueck onPress={() =>navigation.navigate('Home')}></Zurueck>
  
        <ScrollView style = {stylesRezept.scroll}>
          <ImageBackground source={require('../assets/backgroundImages/Sea.jpg')}>
        
          <View style={[stylesRezept.weisserHintergrund, stylesRezept.schattenGross, {height: 260}, {marginTop: Constants.statusBarHeight + 70}, {opacity: 50}]}>
            <Image source={require('../assets/chickenTikka.png')} style={stylesRezept.bildEssen} ></Image>
          </View>
  
  
          <View style={stylesRezept.informationen}></View>
          <View style={[stylesRezept.weisserHintergrund, stylesRezept.schattenGross,{marginTop: 20}]}>
            <View style={stylesRezept.zutaten}>
              <Text style={stylesRezept.Eingabe}>Zutaten</Text>
  
            </View> 
            <View style={stylesRezept.mengen}>
              <Text style={stylesRezept.Eingabe}>Menge in g</Text>
            </View>
          </View>
  
  
          <View style={[stylesRezept.weisserHintergrund, stylesRezept.schattenGross, {marginTop: 20}, {height: 500}]}>
            <Text style={stylesRezept.Eingabe}>Anleitung</Text>
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
    bildEssen:{
      resizeMode: 'cover',
      borderRadius: 25,
      width: '100%',
      height:'100%',
      },
    weisserHintergrund:{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
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
    Eingabe:{
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        color: 'rgba(255,255,255,1)'
      },
    scroll:{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }
  });
