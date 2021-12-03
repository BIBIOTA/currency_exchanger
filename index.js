/* dotenv is set env variable */
import dotenv from 'dotenv';
dotenv.config();

/* fs is fileSystem */
import fs from 'fs';

/* node.js express server */
import express from 'express';
const app = express();
app.use(express.static(process.cwd()));
import * as http from 'http';
const server = http.createServer(app);

/* 
body-parser is setting request body use application/json or application/x-www-form-urlencoded
*/
import bodyParser from 'body-parser';
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

/* validator tool */
import { currencyValidator, checkIsInteger, checkIsIntegerGreaterThanOne } from './validator/validator.js';
/* caculator tool */
import { currencyCaculator } from './validator/caculator.js';

/* currency api */
app.post('/currency', (request, response) => {

  /* get isset form body */
  if (request?.body) {
 
    const { body } = request;

    /* check body has buy, sell and amount value and correct */
    if (!body.buy) {
      return response.status(404).send({
        status: false,
        message: '請填寫來源幣別',
        data: null,
      });
    } else {
      if (!currencyValidator(body.buy)) {
        return response.status(404).send({
          status: false,
          message: '請輸入正確來源幣別',
          data: null,
        });
      }
    }
  
    if (!body.sell) {
      return response.status(404).send({
        status: false,
        message: '請填寫目標幣別',
        data: null,
      });
    } else {
      if (!currencyValidator(body.sell)) {
        return response.status(404).send({
          status: false,
          message: '請輸入正確幣別',
          data: null,
        });
      }
      if (body.buy === body.sell) {
        return response.status(404).send({
          status: false,
          message: '來源幣別與目標幣別相同',
          data: null,
        });
      }
    }
  
    if (!body.amount) {
      return response.status(404).send({
        status: false,
        message: '請填寫金額',
        data: null,
      });
    } else {
      if (!checkIsInteger(body.amount) || !checkIsIntegerGreaterThanOne(body.amount)) {
        return response.status(404).send({
          status: false,
          message: '請填寫正確的金額',
          data: null,
        });
      }
    }
  }

  /* setting required form data and amount is correct type (Int) */
  const { buy, sell, amount } = request.body;

  const form = {
    buy,
    sell,
    amount: parseInt(amount, 10),
  };

   /* get json data */
  const path = process.cwd() + '/currency.json';

  const json = JSON.parse(fs.readFileSync(path, 'utf-8'))

   /* check json key isset */
  if (json?.currencies) {

    if (json.currencies[form.buy][form.buy] && json.currencies[form.buy][form.sell]) {

       /* get buyRate and sellRate, than caculate input amount to sell currency amount */
      const buyRate = json.currencies[form.buy][form.buy];
      const sellRate = json.currencies[form.buy][form.sell];
      
      const result = currencyCaculator(amount, buyRate, sellRate);

      const resultToNumberFormat = new Intl.NumberFormat().format(result);

      return response.json({
        status: true,
        message: '資料取得成功',
        data: {
          caculateResult: resultToNumberFormat,
          buy,
          sell,
        },
      });

    } else {
      return response.json({
        status: false,
        message: '發生例外錯誤:無法取得匯率資料',
        data: null,
      });
    }

  } else {
    return response.status(404).send({
      status: false,
      message: '無法取得更新資料',
      data: null,
    });
  }
});

/* global api hello world haha */
app.get('/*', (request, response) => {
  response.json({
    message: 'Hello World',
  });
});

server.listen(process.env.PORT, () => console.log('start!'));