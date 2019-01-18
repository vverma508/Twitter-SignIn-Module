console.log("Project strated!")

var twitter=require("./lib/common/TwitterHelper.js")

var OAuthSignatureValue = "";
var OAuthToken = "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb";
var consumerKey = "xvz1evFS4wEEPTGEFPHBog";
var Consumersecret = "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw";
var OAuth_token_secret = "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";


// Authentication Order :
// oauth_consumer_key
// oauth_nonce
// oauth_signature
// oauth_signature_method
// oauth_timestamp
// oauth_token
// oauth_version

// ==SAMPLE
// OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", 
// oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", 
// oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", 
// oauth_signature_method="HMAC-SHA1", 
// oauth_timestamp="1318622958", 
// oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", 
// oauth_version="1.0"

var obj={
    status: "Hello Ladies + Gentlemen, a signed OAuth request!",
    include_entities: true
}

twitter.TwitterHelper.signIn("POST","https://api.twitter.com/1.1/statuses/update.json",obj)