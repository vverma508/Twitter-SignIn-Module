const nonce= require('nonce-str');

exports.GetNonce= function(length){
    return nonce(length);
}

exports.GetUnixEpoch = function(){
  return  Math.floor(new Date() / 1000);
}