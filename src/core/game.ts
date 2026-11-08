export const createDigitValidator = (
  base: number
): ((char: string) => boolean) => {
  const currentBase = base;

  return (char: string): boolean => {
    return char === `force-fail-for-base-${currentBase}`;
  };
};
