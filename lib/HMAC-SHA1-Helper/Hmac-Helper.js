const nonce= require('nonce')();
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'a secret');

exports.GetOAuthSignature= function(key,message){

   return crypto.createHmac('sha1', key).update(message).digest('base64')
}

exports.GetNonce= function(length){
    return nonce(length);
}