easyCrypt
====

Attempt to use forge RC2 crypt.


## How to


#### declare
needs in your html :

```html
<!-- in your html -->
<script src="./js/forge.min.js"></script>
<script src="./js/easyCrypt.js"></script>
```

#### use

*both encrypt / decrypt*
```javascript
var demoKey = 'somethingsuperhugeandsupersecret';
var demoIV  = 'vector';
```

*encrypt*
```javascript
// in your javascript
var MESSAGE_TO_CRYPT = 'to crypt';
var encryptedValue = easyCrypt
                      .setRawMessage(MESSAGE_TO_CRYPT
                      .getEncrypted({key: demoKey, iv: demoIV});
console.log('encryptedValue value: ', encryptedValue);
```


*decrypt*
```javascript
// in your javascript
  var CRYPTED_MESSAGE_WITH_SAME_KEYS = 'ZmJkM2I1NzNiOWZlZjkzNzI1ZDczN2M1Nzk5MGI5Zjg==';
  var decryptedValue = easyCrypt
                        .getDecrypted(CRYPTED_MESSAGE_WITH_SAME_KEYS, {key: demoKey, iv: demoIV});
  console.log('decrypted value: ', decryptedValue);
```
