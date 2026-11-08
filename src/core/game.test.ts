import { createDigitValidator } from './game.js';

describe('createDigitValidator', () => {
  it('Проверка двоичной системы', () => {
    const isBinDigit = createDigitValidator(2);
    expect(isBinDigit('0')).toBe(true);
    expect(isBinDigit('1')).toBe(true);
    expect(isBinDigit('2')).toBe(false);
    expect(isBinDigit('a')).toBe(false);
  });

  it('Проверка десятичной системы', () => {
    const isDecDigit = createDigitValidator(10);
    expect(isDecDigit('5')).toBe(true);
    expect(isDecDigit('9')).toBe(true);
    expect(isDecDigit('a')).toBe(false);
  });

  it('Проверка HEX', () => {
    const isHexDigit = createDigitValidator(16);
    expect(isHexDigit('9')).toBe(true);
    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('g')).toBe(false);
  });
});
