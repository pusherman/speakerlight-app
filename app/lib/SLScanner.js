'use strict';

var NetworkInfo = require('NativeModules').NetworkInfo;

var SLScanner = {
  _port: 28409,

  _checkAddress(subnet, host) {
    return new Promise((resolve, reject) => {
      let uriToCheck = `http://${subnet}.${host}:${this._port}/setup_wifi.php`;

      var timeoutPromise = new Promise(resolveTimeout => {
        setTimeout(resolveTimeout, 1500);
      });

      Promise.race([timeoutPromise, fetch(uriToCheck)]).then(response => {
        if (response instanceof Response) {
          reject(`${subnet}.${host}`);

        } else {
          resolve('nope!');
        }
      });
    });
  },

  scan() {
    return new Promise((resolve, reject) => {
      NetworkInfo.getIPAddress(ip => {
        var subnet = ip.substr(0, ip.lastIndexOf('.')),
            hostsToCheck = [];

        for (var host=1; host<255; host++) {
          hostsToCheck.push(this._checkAddress(subnet, host));
        }

        Promise.all(hostsToCheck).then(response => {
          reject('not found');

        }).catch(response => {
          resolve(response);
        });
      })
    });
  }
};

module.exports = SLScanner;
