'use strict';

var easyCrypt = (function () {
  var _message  = '';
  var _unixTimeStampInSec = '';

  var _key  = null;
  var _iv   = null;

  function encrypt(message, options) {
    var encrypted = null;
    var KEY = options.key;
    var IV  = options.iv;
    try {
      // encrypt some bytes
      var cipher = forge.rc2.createEncryptionCipher(KEY);
      cipher.start(IV);
      cipher.update(forge.util.createBuffer(message, 'utf8'));
      cipher.finish();
      encrypted = cipher.output;

      console.log('encrypt result: ', encrypted.toHex());

    } catch (e) {
      throw new CustomException('error while encrypting');
    }
    return encrypted.toHex();
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
    throw this.message;
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
    setRawMessage: function (message) {
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
        return forge.util.encode64(encrypt(_message, options));
      }
      return null;
    },
    getUnixTimeStampInSeconds: function () {
      return _unixTimeStampInSec;
    }
  };
}());
