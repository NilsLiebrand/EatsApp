import { RefreshControl, StyleSheet,View, ScrollView, SafeAreaView, Image, TextInput , Text, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';


//Components
import Hinzufuegen from '../components/Hinzufuegen';
import { FlatList } from 'react-native-gesture-handler';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { useRouteLoaderData } from 'react-router-dom';



//Import Database
const db = SQLite.openDatabase('db.rezepte');

// db.transaction(tx => {
//   tx.executeSql(
//     "DROP TABLE Rezepte",
//     [], 
//     (tx, result) =>
//     {
//       console.log(result);
//     } ,
//     (tx, error) => console.log(error)
    

//   )
// })

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Rezepte (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Bild TEXT, Zeit INTEGER, Kalorien INTEGER, Protein INTEGER, Land TEXT, Zutat TEXT, Anleitung TEXT)'
  ),
  (tx,results) => {
    console.log(results)
  }
  (tx,error) => {
    console.log(error)
  }
})








/* <ScrollView style={stylesHome.scrollView}>
        <RezeptKlein onPress={() =>navigation.navigate('Rezept')} rezeptName = {name}></RezeptKlein>
        <RezeptKlein onPress={() =>navigation.navigate('Rezept')}></RezeptKlein>
        
        
      </ScrollView> */

//sdfsdf




//<TouchableOpacity style={[styles.rezeptKleinBackground, styles.schattenGross]} onPress={rezept.onPress}>

const RezeptKlein = ( { item } ) => (
  
    <View style={[styles.rezeptKleinBackground, styles.schattenGross]}>
        <Text style={styles.ueberschrift}>{item.Name}</Text>
      
       <Image source={{ uri: item.Bild}} style={[styles.bild,styles.schattenGross]}></Image> 

        

        <View style={styles.informationen}>
          <View style={styles.icons}>
            <Image source={require('../assets/Time50px.png')} style={styles.icon}></Image>
            <Image source={require('../assets/Energy50px.png')} style={styles.icon}></Image>
            <Image source={require('../assets/Protein50px.png')} style={styles.icon}></Image>
            <Image source={require('../assets/map50px.png')} style={styles.icon}></Image>
          </View>

          <View style={styles.attribute}>
            <Text style={styles.attribut}>{item.Zeit} min</Text>
            <Text style={styles.attribut}>{item.Kalorien} kcal</Text>
            <Text style={styles.attribut}>{item.Protein} g</Text>
            <Text style={styles.attribut}>{item.Land}</Text>
          </View>
        </View>

        <Text style={styles.anleitung}>{item.Anleitung}</Text>
      </View>
        
)

const getRezept = () =>
{
  const rezeptKarten = [
    {
         id : "100000",
         Name: "UGUR",
         Bild: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540nilspp%252FEats/ImagePicker/4563ba8d-f5ef-435b-94a8-399058ad60aa.jpeg",
         Zeit: "20",
         Kalorien: "399",
         Protein: "24",
         Land: "Australien",
         Zutat: "",
         Anleitung: "jöakdjföaksjöfjasdkl",
    },
    ];


  db.transaction(tx => {

    tx.executeSql('SELECT* FROM Rezepte',

    [],

    (tx,{rows}) => {
      for(let i = 1; i < rows.length; i++)
      {
        console.log(rows._array[i]);
        rezeptKarten.push(rows._array[i]);
      }
    },

    (tx,error) =>{
      console.log("Error ", error);
      Alert.alert("Error ",error);
    }

      )
    })

    return rezeptKarten;
};



function HomeScreen({ navigation }){

  const [rezeptListe, setRezeptListe] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () =>
  {
    //Liste Leeren
    setRezeptListe([]);

    setRefreshing(true);
    setRezeptListe(getRezept());
    console.log("Refresh");
    setRefreshing(false);

  }
    return(
      <SafeAreaView style={stylesHome.container}>
      <StatusBar style='auto'/>
      
      
      <TextInput style={[stylesHome.searchBar, stylesHome.schattenGross]}></TextInput>
      
      <FlatList 
      style={stylesHome.scrollView}
      data = {rezeptListe}
      renderItem={({item}) => (
        <TouchableOpacity  onPress={() =>  navigation.navigate('Rezept')}>
          <RezeptKlein item = {item}></RezeptKlein>
        </TouchableOpacity>
      )}
      onEndReachedThreshold={100}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      />
      


      <Hinzufuegen onPress={() =>navigation.navigate('RezeptHinzufuegen')}/>


      
      </SafeAreaView>
    );
  }





  export default HomeScreen;

  const stylesHome = StyleSheet.create({
    container:{
      flex: 1,
      MarginTop: Constants.statusBarHeight,
    },
    searchBar:{
      position: 'absolute',
      width: '90%',
      height: 70,
      zIndex: 2,
      backgroundColor: 'white',
      borderRadius: 100,
      justifyContent: 'center',
      marginTop: Constants.statusBarHeight,
      alignSelf: 'center',
      //Text
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
    },
    scrollView: {
      paddingTop: 120,
      //backgroundColor: '#fff',
      zIndex: 1,
    },
    schattenGross:{
      elevation: 10,
      shadowColor: '#000000'
    },
  });


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