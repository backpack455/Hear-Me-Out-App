import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Button, Alert, Image} from 'react-native';
import { ListItem, Left, Right, Thumbnail, Body, View, Text} from 'native-base';
import * as firebase from 'firebase'
import Firebasekeys from '../config'
import 'firebase/firestore';
import GoToButton from './DetailsButton';

// 
const themecolor = '#ff7600'
let pending = true
async function getUrl (imageName) {
    let imageRef = firebase.storage().ref().child("images/" + imageName)
    imageRef
  .getDownloadURL()
  .then((url) => {
    //from url you can fetched the uploaded image easily
    console.log(url)
    return url
  })
  .catch((e) => console.log('getting downloadURL of image error => ', e));
  }
export default function Users() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
    
  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('complaints')
      .get()
      .then(querySnapshot => {
        const users = [];
        if(querySnapshot.size > 0)
        {
         pending = false
        }
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      console.log(users)
      setUsers(users);
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    
  }, []);
  
  if (pending) {
    return <View>
    {/* {
          this.state.refreshing && (<View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>)} */}
     
    {/* <ActivityIndicator animating={this.state.isLoading}/> */}
    <Text style={{marginTop: 15, color: '#ff0000', fontWeight: 'bold', alignSelf: 'center'}}>No Complaints Found</Text>
  </View>;
  }
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ListItem thumbnail>
            <Left>
              <Image style={{height: 100,
    width: 100,
    // Set border width.
    borderWidth: 1,
    
    // Set border Hex Color code here.
    borderColor: '#fff',
    
    // Set border Radius.
    borderRadius: 10}}source={require('./../assets/Blank.jpg')}/>
            </Left>
              <Body>
              <Text numberOfLines={2}>{item.title}</Text>
              <Text note numberOfLines={2}>{item.description}</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0 }}>
                    <Text note>{item.date}</Text>
                </View>
              </Body>
              <Right>
                {/* <Button transparent onPress={this.getUserComplaintsHandler} >
                  <Text>View</Text>
                </Button> */}
                <GoToButton/>
              </Right>
            </ListItem>
      )}
      keyExtractor={item => item.key}
      showsVerticalScrollIndicator={false}
    />
  );

  // ...
}