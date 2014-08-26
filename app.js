var express				= require('express');
var app 				= express();
var bodyParser 			= require('body-parser');
var cookieParser 		= require('cookie-parser');
var requestify 			= require('requestify');
var Hashids    			= require('hashids');
var passport 			= require('passport')
var TwitterStrategy 	= require('passport-twitter').Strategy;
var cookieSession		= require('cookie-session');
var config 				= require('./config');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(cookieSession({ 
  key    : 'passportCookie',
  secret : 'Magical Dougnuts',
  cookie : {
    maxAge: 500000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
    consumerKey: '7ivdaM7dX1hKMXUdakHs6jij3',
    consumerSecret: 'XJZ7hHDPQp1zhpUJvA8p4zgFQPaTiKwUTqojtX19WFGsksrruB',
    callbackURL: config.rootURL +"/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
      done(null, {
      	token: token,
      	tokenSecret: tokenSecret,
      	profile: profile
      });
  };
));

app.get('/authenticate', passport.authenticate('twitter'));
app.get('/test', function(req, res) {
	console.log('in');
	console.log(req.user);
});

app.use(express.static(__dirname + '/public'));

if(app.listen(3400)) console.log('App Listening on ' + '3400');


