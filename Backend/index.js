const request = require('request');

request.get({
  url: 'https://api.api-ninjas.com/v1/convertcurrency?want=EUR&have=USD&amount=5000',
  headers: {
    'X-Api-Key': '8UC6iXzYGf0BIaz/oaQ5dQ==0V3lh45lfkR0Zr62'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});