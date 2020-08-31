import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import {Ionicons, Foundation, AntDesign,} from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native-gesture-handler'
import 'firebase/firestore';
const themecolor = '#fff'
const tabcolor = '#ff7a00'
export default function Users() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const db = firebase.firestore()
  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('postings')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  
  if (loading) {
    return <ActivityIndicator />;
  }
  return(
        <FlatList 
        style={styles.feed}
        data={users}
        renderItem={({item}) => (
            <View style={{paddingBottom: 10000}}>
                <View style={{flexDirection: "row"}}>
                    {/* <Image source={jobpost.image} style={styles.avatar}/> */}
                    <Text style={{marginTop: 20, marginLeft: 10, fontSize: 20,}}>{item.company.name}</Text>
                </View>
                <View style={{flex:1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>Job Type: {item.name}</Text>
                        </View>
                        <Ionicons name="ios-more" size={24} color="#73788b"/>
                    </View>

                    <Text style={styles.jobposts}>{item.contact}</Text>

                    {/* <Image source={jobpost.image} style={styles.image} resizeMode="cover"/> */}
                    <View style={{flexDirection: "row", flex: 0.8}}>
                        <AntDesign name="copy1" size={24} color="#73788B" style={{marginLeft: 16}}/>
                        <Text style={{marginLeft: 10, fontSize: 20, color:  "#838899", flex: 0.9}}>Skills: {item.skills}</Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 30}}>
                        <Foundation name="results-demographics" size={24} color="#73788B" style={{marginLeft: 16}}/>
                        <Text style={{marginLeft: 10, fontSize: 20, color:  "#838899"}}> Applicant(s) {}</Text>
                    </View>
                </View>

                <TouchableOpacity style={{paddingTop: 30}} onPress={() => this.props.navigation.navigate('Form Submission')}>
                    <Text style={{marginLeft: 10, fontSize: 20, color: `${tabcolor}`}}>Submit an Application</Text>
                </TouchableOpacity>
                <View style={styles.header}/>
            </View>
        )} keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        />
    )
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
        backgroundColor: '#fff',
        flex:1
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