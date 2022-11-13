import  {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


//Screens
import HomeScreen from './screens/HomeScreen';
import RezeptScreen from './screens/RezeptScreen';
import RezeptHinzufuegenScreen from './screens/RezeptHinzufuegenScreen';

//Constants
const Stack = createNativeStackNavigator();







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

