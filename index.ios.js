'use strict';

var React = require('react-native'),
    DeviceSetup = require('./DeviceSetup');

var {
  StyleSheet,
  Component,
  AppRegistry,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class SpeakerLightApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute = {{
          title: 'Speaker Light',
          component: DeviceSetup,
        }}/>
    );
  }
}

AppRegistry.registerComponent('speakerlight', function() { return SpeakerLightApp });
