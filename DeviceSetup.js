'use strict';

var React = require('react-native');

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

    this.state = {
      wifiPassword: null,
      isLoading: false
    };
  }

  onSearchPressed() {
    this.setState({ isLoading: true });
    console.log(this.state.wifiPassword);
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ wifiPassword: event.nativeEvent.text });
    console.log(this.state.wifiPassword);
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
