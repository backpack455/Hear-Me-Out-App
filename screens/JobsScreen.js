import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Image, RefreshControl, ScrollView, ActivityIndicator} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Ionicons, Foundation, AntDesign,} from "@expo/vector-icons"
import JobsList from './JobsList'
import * as firebase from 'firebase'
import firebaseConfig from './../config.js'
import 'firebase/firestore';

console.disableYellowBox = true;
const themecolor = '#fff'
const tabcolor = '#ff7a00'

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()

export default class ProfileScreen extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
          refreshing: false,
          checkingForPosts: 0,
          jobPostings: null,
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            db.collection("postings").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    this.setState({jobPostings: doc.data()})
                });
            });  
          let oldPosts = this.state.checkingForPosts
          this.setState({
            checkingForPosts: oldPosts + 1,
            refreshing: false,
          });
        }, 2000);
      };
    
    
 
    render(){
        return(
            <ScrollView
            style={{backgroundColor: '#fff'}}
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            title="Getting Data..."
            progressBackgroundColor="#ffff00"
          />
        }
        >

            <JobsList/>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        color:'#fff',

    },
    header: {
        paddingTop: 50,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: `${tabcolor}`,
        shadowColor: "#454D65",
        shadowRadius: 15,
        
    }, headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        backgroundColor: `${themecolor}`,
        borderRadius: 5,
        padding: 8, 
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        marginTop: 20,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
        marginTop: 4
    },
    jobposts: {
        marginTop: 16,
        fontSize: 18,
        color: "#838899",
        marginLeft: 20,
        marginBottom: 20,
    },
    image: {
        width: undefined,
        marginLeft: 10,
        height: 200,
        borderRadius: 5,
        marginVertical: 16,
    }

})