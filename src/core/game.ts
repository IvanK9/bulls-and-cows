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
  const checlLength = guess.length === length;
  const checkValid = [...guess].every(createDigitValidator(base));
  const newSet = new Set(guess.toLowerCase());
  const checkOrig = newSet.size === guess.length;

  return checlLength && checkValid && checkOrig;
};

export const evaluateGuess = (
  secret: string,
  guess: string
): { bulls: number; cows: number } => {
  const secretLower = secret.toLowerCase();
  const guessLower = guess.toLowerCase();
  const guessChar = [...guessLower];

  const bullsCount = guessChar.filter(
    (char, index) => char === secretLower[index]
  ).length;
  const cowCount = guessChar.filter(
    (char, index) => secretLower.includes(char) && char !== secretLower[index]
  ).length;

  return { bulls: bullsCount, cows: cowCount };
};

export const generateSecret = (
  length: number,
  base: number,
  random: () => number
): string => {
  console.log(length, base, random);
  return '';
};
