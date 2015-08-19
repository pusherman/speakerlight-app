'use strict';

var React = require('react-native'),
    DeviceSetup = require('./app/views/DeviceSetup');

var {
  StyleSheet,
  Component,
  AppRegistry,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class SpeakerLightApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style = {styles.container}
        barTintColor = '#454857'
        titleTextColor = '#fff'
        shadowHidden = {true}

        initialRoute = {{
          title: 'Speaker Light',
          component: DeviceSetup,
        }}/>
    );
  }
}

AppRegistry.registerComponent('speakerlight', function() { return SpeakerLightApp });
