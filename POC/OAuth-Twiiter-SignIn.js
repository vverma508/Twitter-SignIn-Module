

var express = require('express');
var oauth = require('oauth');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var keys = {
    OAuthToken: "1042697863250116609-6XJMwiADo2x8gusi9cVQBjFI3N6zsT",
    consumerKey: "FNW2UkiGWujdm2j2j1ub6vNAg",
    Consumersecret: "9DMlHCEFZeYaf4fPQESiurPjeIaLKzboj31oD3mbt7rLblz0Rh",
    OAuth_token_secret: "AorHWxwg4cpIs755rcFwARkadkybpc63mbRrHvIgcGHzC",
    callBackUrl: "https://rm-bot3.herokuapp.com/"
}


// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = keys.consumerKey;
var _twitterConsumerSecret = keys.Consumersecret;

var consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://rm-bot3.herokuapp.com/dev/wenhook/twitter", "HMAC-SHA1");

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/sessions/connect', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + error, 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
});

app.get('/sessions/callback', function(req, res){

  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      res.redirect('/home');
    }
  });
});

app.get('/home', function(req, res){
    consumer.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
          // res.send("Error getting twitter screen name : " + util.inspect(error), 500);
      } else {
          var parsedData = JSON.parse(data);

        // req.session.twitterScreenName = response.screen_name;    
        res.send('You are signed in: ' + parsedData.screen_name);
      } 
    });
});

app.get('*', function(req, res){
    res.redirect('/home');
});

app.listen(8080,function(){
    console.log('App is running')
});