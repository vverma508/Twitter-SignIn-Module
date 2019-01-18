var percentageEncoder = require("../percentageEncoder/percentage-encoder.js")
var HmacHelper = require("../HMAC-SHA1-Helper/Hmac-Helper.js")
var Helper = require("../common/Helper.js")

const http = require("https");
var request = require('request')

exports.TwitterHelper = {

    // keys:keys1,
    signIn: SignIn
}
var keys = {
    OAuthToken: "1042697863250116609-6XJMwiADo2x8gusi9cVQBjFI3N6zsT",
    consumerKey: "FNW2UkiGWujdm2j2j1ub6vNAg",
    Consumersecret: "9DMlHCEFZeYaf4fPQESiurPjeIaLKzboj31oD3mbt7rLblz0Rh",
    OAuth_token_secret: "AorHWxwg4cpIs755rcFwARkadkybpc63mbRrHvIgcGHzC",
    callBackUrl: "https://rm-bot3.herokuapp.com/"
}

var AuthenticationObject = {
    oauth_consumer_key: "",
    oauth_nonce: "",
    oauth_signature: "",
    oauth_signature_method: "",
    oauth_timestamp: "",
    oauth_token: "",
    oauth_version: "1.0"
}
var testObj = {
    status: "Hello Ladies + Gentlemen, a signed OAuth request!",
    include_entities: true,
    oauth_consumer_key: keys.consumerKey,
    oauth_nonce: Helper.GetNonce(32),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Helper.GetUnixEpoch(),
    oauth_token: keys.OAuthToken,
    oauth_version: "1.0"
}

var obj = {
    status: "Hello Ladies + Gentlemen, a signed OAuth request!",
    include_entities: true
}

var Url = "https://api.twitter.com/1.1/statuses/update.json";

var messages = [];
messages.push("POST");
messages.push(percentageEncoder.EncodeString(Url));
messages.push(percentageEncoder.EncodeString(percentageEncoder.EncodeObj(MergeObjects(obj, keys))));

var siningKey = keys.Consumersecret + "&" + keys.OAuth_token_secret;

var OAuthSignatureValue = HmacHelper.GetOAuthSignature(siningKey, messages.join('&'));

var AuthenticationObjMapper = function (keys) {

    AuthenticationObject.oauth_consumer_key = keys.consumerKey;
    AuthenticationObject.oauth_nonce = Helper.GetNonce(32);
    AuthenticationObject.oauth_signature = percentageEncoder.EncodeString(OAuthSignatureValue);
    AuthenticationObject.oauth_signature_method = "HMAC-SHA1"
    AuthenticationObject.oauth_timestamp = Helper.GetUnixEpoch();
    AuthenticationObject.oauth_token = keys.OAuthToken
    AuthenticationObject.oauth_version = "1.0";

    return AuthenticationObject;
}

var GetAuthenticationString = function (authObject) {
    var authArray = []
    for (key in authObject) {
        authArray.push(key + '="' + authObject[key] + '"')
    }
    return "OAuth " + authArray.join(", ")
}

function MergeObjects(obj1, obj2) {
    var mergedObj = {};

    for (var prop in obj1) {
        if (obj1.hasOwnProperty(prop)) {
            mergedObj[prop] = obj1[prop];
        }
    }
    for (var prop in obj2) {
        if (obj2.hasOwnProperty(prop)) {
            mergedObj[prop] = obj2[prop];
        }
    }

    return mergedObj;
}

function SignIn(httpMethod, url, data) {



    // const options = {
    //     "method": "POST",
    //     "hostname": "api.twitter.com",
    //     "path": "https://api.twitter.com/oauth/request_token",
    //     "headers": {
    //         "authorization": GetAuthenticationString(AuthenticationObjMapper(keys)),
    //         "cache-control": "no-cache"
    //     }
    // };
    // const req = http.request(options, function (res) {
    //     let chunks = [];

    //     res.on("data", function (chunk) {
    //         chunks.push(chunk);
    //     });

    //     res.on("end", function () {
    //         let body = Buffer.concat(chunks);
    //         console.log(body.toString());
    //     });
    // });

    // req.end();

    var twitter_oauth = {
        consumer_key: keys.consumerKey,
        consumer_secret: keys.consumer_secret,
        token:keys.OAuthToken,
        token_secret: keys.OAuth_token_secret
      }

    var request_options = {
        url: 'https://twitter.com/oauth/request_token',
        oauth: twitter_oauth,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        form: {
          url: "http://127.0.0.1:8080/sessions/callback"
        }
      }
      
      
      // POST request to create webhook config
      request.post(request_options, function (error, response, body) {
        console.log(body)
      })

}