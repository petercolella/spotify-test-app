/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

// var request = require('request'); // "Request" library

// Use a config file to hide your client id and client secret.
// Put the config.js file in your .gitignore.
// import config from '../../utils/config';
const client_id = config.CLIENT_ID;
const client_secret = config.CLIENT_SECRET;
const base64 = btoa(`${client_id}:${client_secret}`);

/* 
var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
*/

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' + base64
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

console.log(client_id);
console.log(client_secret);
console.log(base64);
console.log(authOptions);

$('#spotify-api').on('click', function() {
  $.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          Authorization: 'Bearer ' + token
        },
        json: true
      };
      $.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });
});
