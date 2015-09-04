'use strict';

var React = require('react-native'),
    SLScanner = require('../lib/SLScanner'),
    SLDevice = require('../lib/SLDevice'),
    SetupWifi = require('./SetupWifi');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20
  },

  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#BEE2E7',
    flex: 1
  },

  buttonText: {
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
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class Status extends Component {

  constructor(props) {
    super(props);

    SLScanner.scan().then(response => {
      SLDevice.ip = response;

      this.setState({
        isLoading: false,
        deviceIP: SLDevice.ip
      });

    }).catch(reject => {
      this.setState({ isLoading: false });
    });

    this.state = {
      isLoading: true,
      deviceIP: null
    };
  }

  onSearchPressed() {
    this.props.navigator.push({
      name: 'Setup Wifi',
      component: SetupWifi
    });
  }

  /*
    consider showing the connection type?
      <Text style={styles.description}>
        Connection: wired
      </Text>
  */

  render() {

    var spinner = this.state.isLoading ?
      <ActivityIndicatorIOS hidden='true' size='large'/> :
      <View/>;

    var status = this.state.deviceIP ? 'Online' : 'Offline';

    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Status: {status}
        </Text>

        <Text style={styles.description}>
          IP: {this.state.deviceIP}
        </Text>

        <View style={styles.description}>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Setup Wifi</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = Status;
