import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TextInput, TouchableWithoutFeedback, Alert} from 'react-native';
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
        
          <View style={[stylesRezept.weisserHintergrund, stylesRezept.schattenGross, {height: 260}, {marginTop: Constants.statusBarHeight + 70,}]}>
            <Image source={require('../assets/chickenTikka.png')} style={stylesRezept.bildEssen}></Image>
          </View>
  
  
          <View style={stylesRezept.informationen}></View>
          <View style={[stylesRezept.weisserHintergrund, stylesRezept.schattenGross,{marginTop: 20}]}>
            <View style={stylesRezept.zutaten}>
              <Text style={stylesRezept.Eingabe}>Zutaten</Text>
  
            </View> 
            <View style={stylesRezept.mengen}>
              <TextInput style={stylesRezept.Eingabe}>Menge in g {"\n"} (1 Person)</TextInput>
            </View>
          </View>
  
  
          <View style={[stylesRezept.weisserHintergrund, stylesRezept.schattenGross, {marginTop: 20}, {height: 500}]}>
            <Text style={stylesRezept.Eingabe}>Anleitung</Text>
          </View>
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
        borderRadius: 25,
      },
    schattenGross:{
        elevation: 10,
        shadowColor: '#000000'
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
      }
  });
