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
import { CommonActions } from '@react-navigation/native';



//Import Database
const db = SQLite.openDatabase('db.rezepte');

function clearDatabase()
{
db.transaction(tx => {
  tx.executeSql(
    "DROP TABLE Rezepte",
    [], 
    (tx, result) =>
    {
      console.log(result);
    } ,
    (tx, error) => console.log(error)
    

  )
})
}
//clearDatabase();

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

        <Text style={styles.anleitung} numberOfLines={4}>{item.Anleitung}</Text>
      </View>
        
)

const ListeEnde = () => {
  //View to set in Footer
  return (
    <View style={{height: 300, paddingTop: 40}}>
      <Text style={{alignSelf: 'center', color: 'grey'}}>Keine Rezepte Mehr</Text>
    </View>
  );
};

const getRezept = () =>
{
  const rezeptKarten = [
    {
         id : '0',
         Name: 'Chicken Tikka Masala',
         //Bild: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540nilspp%252FEats/ImagePicker/4563ba8d-f5ef-435b-94a8-399058ad60aa.jpeg",
         Bild: 'https://images.pexels.com/photos/12737917/pexels-photo-12737917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
         Zeit: '75',
         Kalorien: '403',
         Protein: '45',
         Land: 'Indien',
         Zutat: 'Hünchen',
         Anleitung: 'Place chicken pieces in a large bowl. Rub with lemon juice and enough salt. Marinate for 10 minutes in the refrigerator. Meanwhile, place garlic, ginger, cumin, coriander, garam masala, chili powder, and yogurt in a blender. Process until smooth. Add this paste to the bowl of chicken. Add in oil and mix well. Marinate for at least 30 minutes or overnight if possible.',
    },
    ];


  db.transaction(tx => {

    tx.executeSql('SELECT* FROM Rezepte',

    [],

    (tx,{rows}) => {
      for(let i = 1; i < rows.length; i++)
      {
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

  const [rezeptListe, setRezeptListe] = useState(getRezept())
  const [filteredRezeptListe, setFilteredRezeptListe] = useState(rezeptListe)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () =>
  {
    //Liste Leeren
    setFilteredRezeptListe([]);

    setRefreshing(true);
    setFilteredRezeptListe(getRezept());
    setRefreshing(false);

  }
  //nimmt die Information des gedrückten Rezeptes auf und gibt es zur Ansicht RezeptScreen weiter
  const zumRezept = (item) =>
  {
    navigation.navigate('Rezept', {paramKey: item, });

  }

  const handleSearch = text =>
  { 
    const search = text.toString().toLowerCase();

    //Clear Database
    const deleteAll = 'delete all';
    if(text == deleteAll)
    {
      clearDatabase();
    }
    //Filter Rezeptliste
    if(text)
    {
      const filteredData = rezeptListe.filter(function (item)  {
        return item.Name.toString().toLowerCase().includes(search)
      })
      setFilteredRezeptListe(filteredData);
    }
    else
    {
      setFilteredRezeptListe(rezeptListe);
      console.log("Kein Text");

    }
  }


    return(
      <SafeAreaView style={stylesHome.container}>
      <StatusBar style='auto'/>
      
      
      <TextInput style={[stylesHome.searchBar, stylesHome.schattenGross]} onChangeText={(val) => handleSearch(val)}></TextInput>
      
      <FlatList 
      style={stylesHome.scrollView}
      data = {filteredRezeptListe}
      renderItem={({item}) => (
        //Rezeptkarte inside Touchable Container
        <TouchableOpacity  onPress={() =>  zumRezept(item)}>
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
      maxToRenderPerBatch={8}
      ListFooterComponent={ListeEnde}
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
      flexGrow: 1,
      paddingBottom: 20
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
        lineHeight: 22,
        
      }

  });