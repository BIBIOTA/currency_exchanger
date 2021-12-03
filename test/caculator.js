import chai from 'chai';
import fs from 'fs';
import { currencyCaculator } from '../validator/caculator.js';
import { currencyTypes } from '../consts/currencyTypes.js';

var assert = chai.assert;
var expect = chai.expect;

describe('#currencyCaculator', () => {

  const path = process.cwd() + '/currency.json';

  assert.exists(fs.existsSync(path), 'result.json is not found');

  const json = JSON.parse(fs.readFileSync(path, 'utf-8'))

  function testCase (amount) {
    for (let i = 0; i <= currencyTypes.length - 1; i++) {
      const buyRate = json.currencies[currencyTypes[i]][currencyTypes[i]];
  
      for (let j = i + 1; j <= currencyTypes.length - 1; j++) {
        const sellRate = json.currencies[currencyTypes[i]][currencyTypes[j]];
        return currencyCaculator(amount, buyRate, sellRate);
      }
    }
  }


  const intCount = 20000;
  for (let c = 0; c <= intCount; c++) {
    it(`${c}`, () => {
      assert.isNumber(testCase(c), `input ${c} to currencyCaculator not number`);
    });
  }

})
