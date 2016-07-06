'use strict';

var easyCrypt = (function () {
  var _message  = '';
  // var _messageBase64 = '';
  var _unixTimeStampInSec = '';
  var _separator = '||';

  var _key  = null;
  var _iv   = null;

  function encrypt(message, options) {
    var encrypted = null;
    var KEY = options.key;
    var IV  = options.iv;
    try {
      // encrypt some bytes

      // outputs encrypted hex
      console.log('encrypted: ', encrypted);
    } catch (e) {
      throw new CustomException('error while encrypting');
    }
    return encrypted;
  }

  function encodebase64(value) {
    if (Base64 && typeof Base64 === 'object') {
      return Base64.encode(value);
    } else {
      throw new CustomException('error: base64 lib not found');
    }
  }

  function generateRandomKey() {
    _key = forge.random.getBytesSync(16);
  }

  function generateRandomIV() {
    _iv = forge.random.getBytesSync(8);
  }

  function CustomException(message) {
    this.message = message.toString().trim();
    return this.message;
  }

  function unixTimeStampInSeconds() {
    // Date.now shim
    if (!Date.now) {
      Date.now = () => new Date().getTime();
    }
    return Math.floor(Date.now() / 1000);
  }


  return {
    getCurrentKey: function () {
      return _key;
    },
    getCurrentIV: function () {
      return _iv;
    },
    getRawMessage: function () {
      return _message;
    },
    setRawMessage: function (login, password) {
      _unixTimeStampInSec = unixTimeStampInSeconds();
      _message = login  + _separator + password + _separator + unixTimeStampInSeconds() + '';
      return this;
    },
    forceRawMessage: function (message) {
      _unixTimeStampInSec = unixTimeStampInSeconds();
      _message = message;
      return this;
    },
    getEncrypted: function (options = {key: null, iv: null}) {
      if (!options.key) {
        generateRandomKey(); // set _key to random value
        options.key = _key;
      }
      if (!options.iv) {
        generateRandomIV(); // set _iv to random value
        options.iv = _iv;
      }
      if (_message) {
        return encodebase64(encrypt(_message, options));
      }
      return null;
    },
    getUnixTimeStampInSeconds: function () {
      return _unixTimeStampInSec;
    }
  };
}());
