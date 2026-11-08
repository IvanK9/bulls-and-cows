export const createDigitValidator = (
  base: number
): ((char: string) => boolean) => {
  const allPossibleChars = '0123456789abcdef';
  const allowedChars = allPossibleChars.slice(0, base);

  return (char: string): boolean => {
    if (char.length !== 1) {
      return false;
    }

    const lowerChar = char.toLowerCase();

    return allowedChars.includes(lowerChar);
  };
};

export const isValidGuess = (
  guess: string,
  length: number,
  base: number
): boolean => {
  // const testGuess = guess;
  // const testLength = length;
  // const testBase = base;
  // console.log(testGuess, testLength, testBase);
  console.log(guess, length, base);
  return false;
};
