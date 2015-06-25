/**
 * Created by avikpal on 25/06/15.
 */

var express = require("express"),
    url = require("url"),
    oauth = require("oauth"),
    setupVariables = require("./credentials.json");

var twitterConsumerKey = setupVariables.twitterConsumerKey;
var twitterConsumerSecret = setupVariables.twitterConsumerSecret;



var app = module.exports = express.createServer();

app.get('/',function(request, response){
    response.send("home route");
    //TODO deliver a static page to the client
});

app.get('/followers.json', function(request, response){

    var screenName = request.query.username;

    var query = {
        screen_name:screenName,
        stringify_ids:true
    };

    var twitter = new oauth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        twitterConsumerKey,
        twitterConsumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    twitter.get(
        url.format({
            protocol: 'https:',
            hostname: 'api.twitter.com',
            pathname: '/1.1/followers/ids.json',
            query: query
        }),
        process.env.TWITTER_ACCESS_TOKEN,
        process.env.TWITTER_ACCESS_TOKEN_SECRET,
        function(err, data) {
            if (err) {
                response.send(err);
            } else {
                var users = [];

                JSON.parse(data).forEach(function(user) {
                    users.push(user);
                });

                response.send({
                    'statusCode': 200,
                    'data': users
                });
            }
        }
    );
});

if (!module.parent) {
    app.listen(3000, 'localhost', function () {
        console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
    });

}






