'use strict';

var SLDevice = {
  port: 28409,
  ip: null,
  endpoint: {
    setupWifi: 'setup_wifi.php',
    status: 'status.php'
  },

  _buildUri(endpoint) {
    return `http://${this.ip}:${this.port}/${endpoint}`;
  },

  setWifi(password, ssid) {
    let uri = this._buildUri(this.endpoint.setupWifi);

    uri += `?psk=${password}&ssid=${ssid}`;
console.log('checking uri' + uri);
    return fetch(uri);
  }
};

module.exports = SLDevice;
