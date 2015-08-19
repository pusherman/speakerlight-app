'use strict';

var React = require('react-native'),
    NetworkInfo = require('NativeModules').NetworkInfo,
    SLScanner = require('../lib/SLScanner');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#454857'
  },

  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#BEE2E7',
    flex: 1,
    fontFamily: 'Montserrat'
  },

  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },

  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#454857',
    borderColor: '#454857',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#454857',
    borderRadius: 8,
    color: '#454857'
  }
});

class DeviceSetup extends Component {

  constructor(props) {
    super(props);

    SLScanner.scan().then(response => {
      console.log(response);
      this.setState({
        isLoading: false,
        deviceUrl: response
      });

    }).catch(reject => {
      this.setState({ isLoading: false });
    });

    NetworkInfo.getSSID(ssid => {
      this.setState({ssid: ssid});
    });

    this.state = {
      wifiPassword: null,
      isLoading: true,
      deviceIP: null,
      ssid: null
    };
  }

  onSearchPressed() {
    var url = this.state.deviceUrl,
        psk = this.state.wifiPassword,
        ssid = this.state.ssid;

    url += `?psk=${psk}&ssid=${ssid}`;

    fetch(url)
      .then(() => console.log('yay'))
      .catch(() => console.log('boo'));
  }

  onSearchTextChanged(event) {
    this.setState({ wifiPassword: event.nativeEvent.text });
  }

  render() {
    var spinner = this.state.isLoading ?
      <ActivityIndicatorIOS hidden='true' size='large'/> :
      <View/>;

    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Enter your wifi password below and touch "Go" when done.
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.wifiPassword}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Wifi Password'/>

          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>

        {spinner}

      </View>
    );
  }
}

module.exports = DeviceSetup;
