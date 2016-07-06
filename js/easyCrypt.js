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
    } catch (e) {
      throw new CustomException('error while encrypting');
    }
    console.log('encrypted: ', encrypted.toHex());
    return encrypted.toHex();
  }

  function decrypt(encrypted, options) {
    var decrypted = null;
    var KEY = options.key;
    var IV  = options.iv;
    try {
      // encrypt some bytes
      console.log('decrypt: ', encrypted);
      var cipher = forge.rc2.createDecryptionCipher(KEY);
      cipher.start(IV);
      cipher.update(forge.util.createBuffer(encrypted, 'utf8'));
      cipher.finish();
      decrypted = cipher.output;
    } catch (e) {
      throw new CustomException('error while decrypting', e);
    }
    console.log('decrypted: ', hex_to_ascii(decrypted.toHex()));
    return decrypted.toHex();
  }

  function hex_to_ascii(str1)
 {
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
 }

  function generateRandomKey() {
    _key = forge.random.getBytesSync(16);
  }

  function generateRandomIV() {
    _iv = forge.random.getBytesSync(8);
  }

  function CustomException(message, error) {
    this.message = message.toString().trim();
    console.error(error);
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
    getDecrypted: function (encrypted, options = {key: null, iv: null}) {
      if (!options.key) {
        generateRandomKey(); // set _key to random value
        options.key = _key;
      }
      if (!options.iv) {
        generateRandomIV(); // set _iv to random value
        options.iv = _iv;
      }
      if (encrypted) {
        return decrypt(forge.util.decode64(encrypted), options);
      }
      return null;
    },
    getUnixTimeStampInSeconds: function () {
      return _unixTimeStampInSec;
    }
  };
}());
