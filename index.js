console.log("Project strated!")

var percentageEncoder = require("./lib/percentageEncoder/percentage-encoder.js")
var HmacHelper= require("./lib/HMAC-SHA1-Helper/Hmac-Helper.js")
var testObj = {
    status: "Hello Ladies + Gentlemen, a signed OAuth request!",
    include_entities: true,
    oauth_consumer_key: "xvz1evFS4wEEPTGEFPHBog",
    oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: 1318622958,
    oauth_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
    oauth_version: "1.0"
}

var Url="https://api.twitter.com/1.1/statuses/update.json";

var messages= [];
messages.push("POST");
messages.push(percentageEncoder.EncodeString(Url));
messages.push( percentageEncoder.EncodeString(percentageEncoder.EncodeObj(testObj)));

var key="kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";

console.log(  HmacHelper.GetOAuthSignature(key,messages.join('&')));