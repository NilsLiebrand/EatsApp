import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';



function RezeptKlein(props){
    return(
      <TouchableOpacity style={[styles.rezeptKleinBackground, styles.schattenGross]} onPress={props.onPress}>
        <Text style={styles.ueberschrift}>{props.rezeptName}</Text>
      
       <Image source={require('../assets/chickenTikka.png')} style={[styles.bild,styles.schattenGross]}></Image> 

        

        <View style={styles.informationen}>
          <View style={styles.icons}>
            <Image source={require('../assets/Time50px.png')} style={styles.icon}></Image>
            <Image source={require('../assets/Energy50px.png')} style={styles.icon}></Image>
            <Image source={require('../assets/Protein50px.png')} style={styles.icon}></Image>
            <Image source={require('../assets/map50px.png')} style={styles.icon}></Image>
          </View>

          <View style={styles.attribute}>
            <Text style={styles.attribut}>{props.kochZeit} min</Text>
            <Text style={styles.attribut}>{props.kalorien} kcal</Text>
            <Text style={styles.attribut}>{props.protein} g</Text>
            <Text style={styles.attribut}>{props.land}</Text>
          </View>
        </View>

        <Text style={styles.anleitung}>{props.anleitung}</Text>
        
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    rezeptKleinBackground:{
        width: '90%',
        height: 260,
        borderRadius: 25,
        backgroundColor: 'white',
        marginTop: 20,
        alignSelf: 'center',
        
      },
      schattenGross:{
        elevation: 10,
        shadowColor: '#000000',
      },
      bild:{
        borderRadius: 20,
        height: '55%',
        width: '50%',
        resizeMode: 'cover',
        marginTop: 10,
        marginLeft: 10,
        overflow: 'visible',
      },
      ueberschrift:{
        position: 'absolute',
        width: '50%',
        marginTop: 10,
        marginLeft: '50%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
      },
      informationen:{
        position: 'absolute',
        height: '50%',
        width: '40%',
        marginTop: 30,
        marginLeft: '55%',
        },
        icons:{
          width: '30%',
          height: '100%',
          justifyContent: 'space-evenly',
          paddingVertical: 10, 
        },
        icon:{
          resizeMode: 'center',
        },
        attribute:{
          position: 'absolute',
          justifyContent: 'space-between',
          paddingVertical: 8,
          width: '70%',
          height: '100%',
          marginLeft: '30%',
        },
        attribut:{
          alignSelf:'center',
          color: '#959595',
        },
      anleitung:{
        marginLeft: 10,
        marginTop: 10,
      }

  });

export default RezeptKlein