import * as React from 'react';
import {TextInput, Modal, View, Button, StyleSheet, Text, Alert, StatusBar} from 'react-native';
import Heatmap from 'react-native-maps';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {IconButton, Colors} from 'react-native-paper'
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {WebView} from 'react-native-webview'
import Firebasekeys from '../config'
import 'firebase/firestore';

const themecolor = '#fff'
const tabcolor = '#5271ff'

const fgjprojections = ''
const GOOGLE_MAPS_APIKEY = 'AIzaSyCUFZ6i7YdM3X2HEUcnFK_CNq_VfKsr4eI'
export default class Search extends React.Component {
  state = {
    location: null,
    userPlaces: [],
    helpStatus: false,
  }

  componentDidMount(){
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if(status === 'granted'){
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location});
      firebase.firestore()
      .collection('locations')
      .add({
          date: this.state.date,
          location: this.state.location,
          locationtext: this.state.locationtext,
          time: this.state.time,
          cost: this.state.cost,
          title: this.state.title,
          extradetails: this.state.extradetails,
      })
      console.log('Successfully submitted to locations in firestore')
     }

    else{
      Alert.alert('Location services has not been enabled. Please go to the Settings and enable it.')
    }
  };

  getUserPlacesHandler = () => {
    fetch('https://emergencyhelper-b6c9e.firebaseio.com/places.json')
      .then(res => res.json())
      .then (parsedRes => {
        const placesArray =[];
        for (const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          })
        }
        this.setState({
          userPlaces: placesArray
        })
      })
      .catch(err => console.log(err))
  }

  render(){
    const usersMarkers = this.state.userPlaces.map(
      userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id}/>)
    var heatmapLocs = [];
    const usersHeatmap = this.state.userPlaces.map(
      userPlace => heatmapLocs.push({latitude: userPlace.latitude, longitude: userPlace.longitude, weight: 1})
    )
    return (
      <WebView source={{ uri: 'https://jsfiddle.net/kt7cv45n/show' }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    fontSize: 40,
    alignSelf: 'center'
  },
  search: {
    flex: 1,
    position:'absolute', 
    top: 0,
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  }
});