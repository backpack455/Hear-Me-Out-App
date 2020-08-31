import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const RiskLevel = 'example'
const Victim = 'Om Joshi'
const Title = 'Cashier Refused To Offer Me Service At Kroger'
const Description = ''
const Location = 'Bloomfield Hills, Michigan'
const Date = '8/01/2020'
const Race = 'IDK'
const RaceOfVictimizer = 'IDK'
const Time = '6:53 PM'
const Victimizer = 'IDK'
const Profession = 'Cashier'

const ComplaintsRead = 1
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.container}>
            <View style={{margin: 8, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 24, width: (screenWidth-64/2), backgroundColor: '#ff7a00', height:screenHeight - 300 }}>
                <Text style={{color: '#fff',fontSize:24 , fontWeight: 'bold'}}>Example title</Text>
                <Text></Text>
                <View style={{flexDirection: 'row'}}>
                    
                    <Image style={styles.BorderClass}source={require('./../assets/Blank.jpg')}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.TextLittle}>Example description, example description, {"\n"}example description</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text/>
                        <Text/>
                        <Text style={styles.Text}>Location: Example location</Text>
                        <Text/>
                        <Text style={styles.Text}>Time: Example time</Text>
                        <Text/>
                        <Text style={styles.Text}>Date: Example date</Text>
                        <Text/>
                    </View>
                </View>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: 300,
      paddingHorizontal: 5,
      backgroundColor: 'white',
      marginBottom: 5,
    },
    inputContainer: {
      marginBottom: 20,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    error: { textAlign: 'center', height: 17.5 },
    BorderClass:{
    height: 100,
    width: 100,
    // Set border width.
    borderWidth: 1,
    
    // Set border Hex Color code here.
    borderColor: '#ff7a00',
    
    // Set border Radius.
    borderRadius: 10
    },
    Text : {
        paddingLeft: 10,
        fontSize: 20,
        flexDirection: 'column',
        color: '#fff'
    },
    TextLittle: {
        paddingLeft: 10,
        fontSize: 12,
        alignSelf: 'flex-start',
        color: '#fff'
    }
});