import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Loading } from '../components/common/';
import axios from 'axios';

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: ''
    }
  }

  componentDidMount(){
    const headers = {
      'Authorization': 'Bearer ' + this.props.jwt
    };
    axios({
      method: 'GET',
      url: 'http://172.26.48.1/api/profile/about',
      headers: headers,
    }).then((response) => {
      this.setState({
        email: response.data.email,
        about: response.data.about,
        work: response.data.work,
        name: response.data.name,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  render() {
    const { container, emailText, errorText } = styles;
    const { loading, email, error, about, work, name } = this.state;

    if (loading){
      return(
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
        return(
          <View style={container}>
            <View>

            <Text style={{fontSize: 30, textAlign: 'center'}}>

              My Profile {"\n"} 

            </Text>
              
            <Text style ={emailText}>
                  Name: {name}
                </Text>


              {email ?
                <Text style={emailText}>
                  Your email: {email}
                </Text>
                
                :
                <Text style={errorText}>
                  {error}
                </Text>}

                <Text style={emailText}>
                  Work: {work}
                </Text>

                <Text style={emailText}>
                  About: {about} {"\n"} {"\n"} {"\n"}
                </Text>
                
                
            </View>
            <Button onPress={this.props.deleteJWT}>
              Log Out
            </Button>
          </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }

};