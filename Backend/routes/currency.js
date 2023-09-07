const express = require("express");
const currencyRouter = express.Router();
const request = require('request');
const API_KEY=process.env.API_KEY;
require('dotenv').config();

currencyRouter.get("/", (req, res) => {
  const {sentAmount, fromCurrency, toCurrency } = req.query;
  const url = process.env.URL
    .replace('${toCurrency}', toCurrency)
    .replace('${fromCurrency}', fromCurrency)
    .replace('${amount}', sentAmount);
  request.get(
    {
      url:url,
      headers: {
        "X-Api-Key":API_KEY,
      },
    },
    function (error, response, body) {
      if (error) res.json(error);
      else if (response.statusCode != 200)
       res.json({message:"201 not resolved"})
      else res.json(body);
    }
  );;
});

module.exports = currencyRouter;
