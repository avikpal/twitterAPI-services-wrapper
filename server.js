/**
 * Created by avikpal on 25/06/15.
 */

var express = require("express"),
    url = require("url"),
    oauth = require("oauth");




var app = express();

app.get('/',function(request, response){
    response.send("home route");
    //TODO deliver a static page to the client
});

app.get('/followers.json', function(request, response){

    var twitter = new oauth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.TWITTER_CONSUMER_KEY,
        process.env.TWITTER_CONSUMER_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    var screenName = request.query.username;

    var query = {
        screen_name:screenName,
        stringify_ids:true
    };

    var twitter = new oauth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.TWITTER_CONSUMER_KEY,
        process.env.TWITTER_CONSUMER_SECRET,
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
                response.jsonp(err);
            } else {
                var users = [];

                JSON.parse(data).forEach(function(user) {
                    users.push(user);
                });

                response.jsonp({
                    'statusCode': 200,
                    'data': users
                });
            }
        }
    );
});




