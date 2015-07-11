'use strict';

var React = require('react-native'),
    NetworkInfo = require('NativeModules').NetworkInfo;

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },

  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
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
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
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
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

class DeviceSetup extends Component {

  constructor(props) {
    super(props);

    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
    });

    this.state = {
      wifiPassword: null,
      isLoading: false,
      defaultPort: 187,
      startHost: 3
    };
  }

  _found(response) {
    console.log('speaker found!');
  }

  _notFound(subnet, host, port) {
    if (++host <= 255) {
      this._checkAddress(subnet, host, port);

    } else {
      console.log('light not found');
    }
  }

  _checkAddress(subnet, host, port) {
    let uriToCheck = `http://${subnet}.${host}:${port}/index.php`;

    var timeoutPromise = new Promise(function(resolve) {
      setTimeout(resolve, 1000);
    });

    console.log(`checking ${uriToCheck}`);

    Promise.race([timeoutPromise, fetch(uriToCheck)]).then(response => {
      if (response instanceof Response) {
        this._found(uriToCheck);

      } else {
        this._notFound(subnet, host, port);
      }
    });
  }

  onSearchPressed() {
    this.setState({ isLoading: true });

    NetworkInfo.getIPAddress(ip => {
      var subnet = ip.substr(0, ip.lastIndexOf('.'));
      this._checkAddress(subnet, this.state.startHost, this.state.defaultPort);
    });
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
