import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email: '',
      password: '',
      error: '',
      date_of_birth:'',
      sex: '',
      location_name: '',
      longitude: '',
      latitude: '',
      age: '',
      loading: false
    };

    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  registerUser() {
    const { age,email, password, name, date_of_birth, sex, location_name, longitude, latitude } = this.state;

    this.setState({ error: '', loading: true });

    // NOTE Post to HTTPS only in production
    axios.post("http://172.26.48.1/api/auth/signup",{
      
        email: email,
        password: password,
        name: name,
        date_of_birth: date_of_birth,
        sex: sex,
        location_name: location_name,
        longitude: longitude,
        latitude: latitude,
        age: age,
      
    },)
    
    .catch((error) => {
      console.log(error);
      this.onRegistrationFail();
    });
  }

  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  render() {
    const { latitude,longitude,email, password, date_of_birth, error, loading, name,age, sex, location_name } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <Fragment>
        <View style={form}>
          
        <View style={section}>
            <Input
              placeholder="John Doe"
              label="Name"
              value={name}
              onChangeText={name => this.setState({ name })}
            />
          </View>

          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <View style={section}>
            <Input
              
              placeholder="e.g. 1997"
              label="Date of Birth"
              value={date_of_birth}
              onChangeText={date_of_birth => this.setState({ date_of_birth })}
            />
            
          </View>

          <View style={section}>
            <Input
              
              placeholder="Age"
              label="Age"
              value={age}
              onChangeText={age => this.setState({ age })}
            />
            
          </View>

          <View style={section}>
            <Input
              
              placeholder="Sex"
              label="Sex"
              value={sex}
              onChangeText={sex => this.setState({ sex })}
            />
            
          </View>

          <View style={section}>
            <Input
              
              placeholder="Dhaka"
              label="Location Name"
              value={location_name}
              onChangeText={location_name => this.setState({ location_name })}
            />
            
          </View>

          <View style={section}>
            <Input
              
              placeholder="Longitude"
              label="Longitude"
              value={longitude}
              onChangeText={longitude => this.setState({ longitude })}
            />
            
          </View>

          <View style={section}>
            <Input
              
              placeholder="Latitude"
              label="Latitude"
              value={latitude}
              onChangeText={latitude => this.setState({ latitude })}
            />
            
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.registerUser}>
              Register
            </Button>
            :
            <Loading size={'large'} />
          }
        </View>
        <TextLink onPress={this.props.authSwitch}>
          Already have an account? Log in!
        </TextLink>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export { Registration };