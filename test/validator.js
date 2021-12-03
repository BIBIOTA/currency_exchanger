import chai from 'chai';
import { currencyValidator, checkIsInteger, checkIsIntegerGreaterThanOne } from '../validator/validator.js';

var assert = chai.assert;
var expect = chai.expect;

describe('#currencyValidator', () => {
  it('TWD', () => {
    expect(currencyValidator('TWD')).to.equal(true);
  });

  it('USD', () => {
    expect(currencyValidator('USD')).to.equal(true);
  });

  it('JPY', () => {
    expect(currencyValidator('JPY')).to.equal(true);
  });

  it('any string', () => {
    expect(currencyValidator('R?')).to.equal(false);
  });

  it('int', () => {
    expect(currencyValidator(1)).to.equal(false);
  });

  it('boolean true', () => {
    expect(currencyValidator(true)).to.equal(false);
  });

  it('boolean false', () => {
    expect(currencyValidator(false)).to.equal(false);
  });
})

describe('#checkIsInteger', () => {
  it('int', () => {
    expect(checkIsInteger(122112)).to.equal(true);
  });

  it('string int', () => {
    expect(checkIsInteger('11223')).to.equal(true);
  });

  it('string 0', () => {
    expect(checkIsInteger('0')).to.equal(true);
  });

  it('float', () => {
    expect(checkIsInteger(122112.22)).to.equal(false);
  });

  it('string char', () => {
    expect(checkIsInteger('yoyo')).to.equal(false);
  });

  it('boolean true', () => {
    expect(checkIsInteger(true)).to.equal(false);
  });

  it('boolean false', () => {
    expect(checkIsInteger(false)).to.equal(false);
  });
  
})

describe('#checkIsIntegerGreaterThanOne', () => {
  it('int', () => {
    expect(checkIsIntegerGreaterThanOne(122112)).to.equal(true);
  });

  it('string > 0', () => {
    expect(checkIsIntegerGreaterThanOne('1000')).to.equal(true);
  });

  it('int 0', () => {
    expect(checkIsIntegerGreaterThanOne(0)).to.equal(false);
  });

  it('string 0', () => {
    expect(checkIsIntegerGreaterThanOne('0')).to.equal(false);
  });

  it('string any', () => {
    expect(checkIsIntegerGreaterThanOne('yoyo')).to.equal(false);
  });

  it('boolean true', () => {
    expect(checkIsIntegerGreaterThanOne(true)).to.equal(false);
  });

  it('boolean false', () => {
    expect(checkIsIntegerGreaterThanOne(false)).to.equal(false);
  });
  
})