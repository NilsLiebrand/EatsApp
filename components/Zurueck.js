import { StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Constants from 'expo-constants';

function Zurueck(props){
    return(

    <TouchableWithoutFeedback onPress={props.onPress}>
        <Image source={require('../assets/zurueck100px.png')} style={styles.zurueckBild}></Image>
    </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
zurueckBild:{
    zIndex: 2, 
    height: 50,
    width: 50,
    resizeMode: 'stretch',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: Constants.statusBarHeight, 
   },
})

export default Zurueck;