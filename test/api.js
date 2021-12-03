import chai from 'chai';
import supertest from 'supertest';
import { currencyTypes } from '../consts/currencyTypes.js';

var assert = chai.assert;
var expect = chai.expect;

const api = supertest('http://localhost:8050'); // API

/**
 * Parse a localized number to a float.
 * @param {string} stringNumber - the localized number
 * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 */
 function parseLocaleNumber(stringNumber) {
  var thousandSeparator = Intl.NumberFormat().format(11111).replace(/\p{Number}/gu, '');
  var decimalSeparator = Intl.NumberFormat().format(1.1).replace(/\p{Number}/gu, '');

  return parseFloat(stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  );
}

describe('currency', () => {
  const testCount = 100;

  for (let i = 1; i <= testCount; i++) {
    const amount = Math.floor(Math.random() * (9999999 - 1) + 1);

    for (let i = 0; i <= currencyTypes.length - 1; i++) {
      const buy = currencyTypes[i];
  
      for (let j = i + 1; j <= currencyTypes.length - 1; j++) {
        const sell = currencyTypes[j];
        it('currency should be an json response include status, message, data', (done) => {
          api.post('/currency')
            .send({ amount, buy, sell })
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res) {
              if (err) return done(err);
              const responseData = JSON.parse(res.text);
              const { status, message, data } = responseData;
              expect(status).to.equal(true);
              expect(data.buy).to.equal(buy);
              expect(data.sell).to.equal(sell);
              assert.isNumber(parseLocaleNumber(data.caculateResult), 'function parseLocaleNumber(caculateResult) are not number');
              assert.isString(data.caculateResult, 'caculateResult are not string');
              assert.isString(message, 'message are not string');
              done();
            });
        });
      }
    }

  }
});
