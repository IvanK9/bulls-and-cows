export const createDigitValidator = (base) => {
    const allowedChars = getAllowedChars(base);
    return (char) => {
        if (char.length !== 1) {
            return false;
        }
        const lowerChar = char.toLowerCase();
        return allowedChars.includes(lowerChar);
    };
};
export const isValidGuess = (guess, length, base) => {
    const checlLength = guess.length === length;
    const checkValid = [...guess].every(createDigitValidator(base));
    const newSet = new Set(guess.toLowerCase());
    const checkOrig = newSet.size === guess.length;
    return checlLength && checkValid && checkOrig;
};
export const evaluateGuess = (secret, guess) => {
    const secretLower = secret.toLowerCase();
    const guessLower = guess.toLowerCase();
    const guessChar = [...guessLower];
    const bullsCount = guessChar.filter((char, index) => char === secretLower[index]).length;
    const cowCount = guessChar.filter((char, index) => secretLower.includes(char) && char !== secretLower[index]).length;
    return { bulls: bullsCount, cows: cowCount };
};
export const generateSecret = (length, base, random) => {
    const allowedChars = getAllowedChars(base);
    const charsArray = [...allowedChars];
    const shuffledChars = charsArray.sort(() => random() - 0.5);
    return shuffledChars.slice(0, length).join('');
};
const getAllowedChars = (base) => {
    const allPossibleChars = '0123456789abcdef';
    return allPossibleChars.slice(0, base);
};
const cache = {};
export const countPossibleSecrets = (length, base) => {
    if (length === 0) {
        return 1;
    }
    const cacheKey = `${length}-${base}`;
    if (cache[cacheKey] !== undefined) {
        return cache[cacheKey];
    }
    const result = base * countPossibleSecrets(length - 1, base - 1);
    cache[cacheKey] = result;
    return result;
};
