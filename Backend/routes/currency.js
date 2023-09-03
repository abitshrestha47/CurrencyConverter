const express = require("express");
const currencyRouter = express.Router();
const request = require('request');



currencyRouter.get("/", (req, res) => {
  const {sentAmount, fromCurrency, toCurrency } = req.query;
//   console.log(toCurrency);
//   console.log(fromCurrency);
  request.get(
    {
      url: `https://api.api-ninjas.com/v1/convertcurrency?want=${toCurrency}&have=${fromCurrency}&amount=${sentAmount}`,
      headers: {
        "X-Api-Key": "8UC6iXzYGf0BIaz/oaQ5dQ==0V3lh45lfkR0Zr62",
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else res.json(body);
    }
  );
//   res.json({
//     from: from,
//     to: to,
//     fromCurrency: fromCurrency,
//     toCurrency: toCurrency,
//   });
});

module.exports = currencyRouter;