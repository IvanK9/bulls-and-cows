import {
  createDigitValidator,
  isValidGuess,
  evaluateGuess,
  generateSecret,
} from './game.js';

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

describe('isValidGuess', () => {
  it('Доустимая попытка', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  it('Проверка длины', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  it('Недопустимые символы', () => {
    expect(isValidGuess('123a', 4, 10)).toBe(false);
  });

  it('Проверка повторов', () => {
    expect(isValidGuess('1212', 4, 10)).toBe(false);
  });
});

describe('evaluateGuess', () => {
  it('Считаем быков и коров', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });

    expect(evaluateGuess('1234', '1342')).toEqual({ bulls: 1, cows: 3 });

    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });

    expect(evaluateGuess('a123', 'A567')).toEqual({ bulls: 1, cows: 0 });
  });
});

describe('generateSecret', () => {
  it('Генерируем число', () => {
    const mockRandom = () => 0.5;
    const secret = generateSecret(4, 10, mockRandom);

    expect(secret.length).toBe(4);

    const uniquChars = new Set(secret);
    expect(uniquChars.size).toBe(4);
  });
});
