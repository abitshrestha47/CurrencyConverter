const request = require('request');
const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const currencyRouter=require('./routes/currency');
const PORT=process.env.PORT;

app.use(cors());
app.use('/getConverted',currencyRouter);
app.listen(PORT,()=>{
  console.log(`Server is listening on port http://localhost:${PORT}`);
});



// request.get({
//   url: 'https://api.api-ninjas.com/v1/convertcurrency?want=EUR&have=USD&amount=5000',
//   headers: {
//     'X-Api-Key': '8UC6iXzYGf0BIaz/oaQ5dQ==0V3lh45lfkR0Zr62'
//   },
// }, function(error, response, body) {
//   if(error) return console.error('Request failed:', error);
//   else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//   else console.log(body)
// });