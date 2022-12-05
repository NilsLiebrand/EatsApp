import { StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';



function Hinzufuegen(props){
    return( 
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[stylesHinzufuegen.rezeptHinzufuegen, stylesHinzufuegen.schattenGross]}>
                <Image source={require('../assets/Plus100px.png')} style={stylesHinzufuegen.plus}></Image>
            </View>
        </TouchableWithoutFeedback>
     );
}

const stylesHinzufuegen = StyleSheet.create({rezeptHinzufuegen:{
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
  },
  schattenGross:{
    elevation: 10,
    shadowColor: '#000000'
  }
});

export default Hinzufuegen;