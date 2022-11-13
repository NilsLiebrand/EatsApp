import  {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as SQLite from 'expo-sqlite'

//Screens
import HomeScreen from './screens/HomeScreen';
import RezeptScreen from './screens/RezeptScreen';
import RezeptHinzufuegenScreen from './screens/RezeptHinzufuegenScreen';

//Constants
const Stack = createNativeStackNavigator();

const db = SQLite.openDatabase("db.rezept");



const rezept = {
  name: "string",
  properties: {
    //bild: 'image'
    dauer: "",
    zutaten: "string",
    mengen: "double",
    anleitung: "string"

  },
  primaryKey: "ID",
}


//Navigation between screens and Rendering
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="RezeptHinzufuegen" component={RezeptHinzufuegenScreen}/>
        <Stack.Screen name="Rezept" component={RezeptScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

