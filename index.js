import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

import express from 'express';
const app = express();
app.use(express.static(process.cwd()));
import * as http from 'http';
const server = http.createServer(app);

app.post('/currency', (request, response) => {


  console.log(request);

  if (request?.query) {
 
    const { query } = request;

    if (query.buy) {
      console.log(query.buy);
    }
  
    if (query.sell) {
      console.log(query.sell);
    }
  
    if (query.amount) {
      console.log(query.amount);
    }
  }


  const path = process.cwd() + '/currency.json';

  const json = JSON.parse(fs.readFileSync(path, 'utf-8'))

  console.log(json);

  console.log(Math.round((json.currencies.TWD.USD + Number.EPSILON) * 100) / 100);

  if (json?.currencies) {
    response.json({
      status: true,
      message: '資料取得成功',
      ...json
    });
  } else {
    response.status(404).send({
      status: false,
      message: '無法取得更新資料',
      data: null,
    });
  }
});

app.get('/*', (request, response) => {
  response.json({
    message: 'Hello World',
  });
});

server.listen(process.env.PORT, () => console.log('start!'));