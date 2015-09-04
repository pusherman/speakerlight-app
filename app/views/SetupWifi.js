'use strict';

var React = require('react-native'),
    NetworkInfo = require('NativeModules').NetworkInfo,
    SLDevice = require('../lib/SLDevice');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#454857'
  },

  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#BEE2E7',
    flex: 1
  },

  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
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
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  inputText: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    borderWidth: 1,
    borderColor: '#454857',
    borderRadius: 8,
    color: '#454857'
  }
});

class SetupWifi extends Component {

  constructor(props) {
    super(props);

    NetworkInfo.getSSID(ssid => {
      this.setState({ssid: ssid});
    });

    this.state = {
      wifiPassword: null,
      isLoading: true,
      ssid: null
    };
  }

  onPasswordTextChanged(event) {
    this.setState({ wifiPassword: event.nativeEvent.text });
  }

  onSetupPressed() {
    SLDevice.setWifi(this.state.wifiPassword, this.state.ssid).then(response => {
      this.setState({success: true});

    }).catch(response => {
      this.setState({failure: true});
    });
  }

  render() {

    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Enter your wifi password
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.inputText}
            value={this.state.wifiPassword}
            onChange={this.onPasswordTextChanged.bind(this)}
            placeholder='Wifi Password'/>

          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSetupPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.description}>
          Setting for Network: {this.state.ssid}
        </Text>

        {this.state.success ? <Text>Wifi settings updated!  Unplug the power to your SpeakerLight and remove the network cable.  Wait 5 seconds and plug the power cable back in.</Text> : null}

        {this.state.failure ? <Text>Wifi settings can not be updated at this time.</Text> : null}
      </View>
    );
  }
}

module.exports = SetupWifi;
