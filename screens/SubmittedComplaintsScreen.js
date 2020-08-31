import React from 'react'
import {View, Text, StyleSheet, Platform, Alert, ActivityIndicator, ScrollView, RefreshControl} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SubmittedRequests from './SubmittedComplaints'
import {WebView} from 'react-native-webview'

const employmentprojections = 'https://www.bls.gov/emp/'

export default class SubmittedComplaintsScreen extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            
          let oldPosts = this.state.checkingForPosts
          this.setState({
            checkingForPosts: oldPosts + 1,
            refreshing: false,
          });
        }, 2000);
      };
    render(){
        return(
            <ScrollView style={styles.container} refreshControl={<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                title="Getting Data..."
                progressBackgroundColor="#ffff00"
              />}>
                <SubmittedRequests/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})