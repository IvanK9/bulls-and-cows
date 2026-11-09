import {
  countPossibleSecrets,
  createDigitValidator,
  evaluateGuess,
  generateSecret,
  isValidGuess,
} from '../core/game.js';

export const initSettingsScreen = (): void => {
  const body = document.body;

  body.textContent = '';

  const header = document.createElement('header');
  const сontainer = document.createElement('div');
  const headerContainer = document.createElement('div');
  сontainer.className = 'container';
  header.className = 'header';
  headerContainer.className = 'header__wrap';
  header.appendChild(сontainer);
  сontainer.appendChild(headerContainer);

  const main = document.createElement('main');
  main.className = 'main';
  const mainContainer = document.createElement('div');
  mainContainer.className = 'container';
  const mainWrap = document.createElement('div');
  mainWrap.className = 'main__wrap';
  mainWrap.id = 'game-area';
  main.appendChild(mainContainer);
  mainContainer.appendChild(mainWrap);

  const title = document.createElement('h1');
  title.className = 'header__title';
  title.textContent = 'Быки и Коровы';
  headerContainer.appendChild(title);

  const settingsPanel = document.createElement('div');
  settingsPanel.className = 'header__settings';
  headerContainer.appendChild(settingsPanel);

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Система: ';
  baseLabel.className = 'header__label header__label-base';
  const baseSelect = document.createElement('select');
  baseSelect.className = 'header__select header__select-base';
  baseSelect.name = 'base';

  const bases: [string, number][] = [
    ['bin (2)', 2],
    ['oct (8)', 8],
    ['dec (10)', 10],
    ['hex (16)', 16],
  ];

  bases.forEach(([name, value]) => {
    const option = document.createElement('option');
    option.value = value.toString();
    option.textContent = name;
    baseSelect.appendChild(option);
  });
  baseLabel.appendChild(baseSelect);
  settingsPanel.appendChild(baseLabel);

  const lengthLabel = document.createElement('label');
  lengthLabel.textContent = ' Длина: ';
  lengthLabel.className = 'header__label header__label-length';
  const lengthSelect = document.createElement('select');
  lengthSelect.className = 'header__select header__select-length';
  lengthSelect.name = 'length';

  const secretLength = [2, 3, 4, 5, 6];

  secretLength.forEach((num) => {
    const option = document.createElement('option');
    option.value = num.toString();
    option.textContent = num.toString();
    lengthSelect.appendChild(option);
  });
  lengthLabel.appendChild(lengthSelect);
  settingsPanel.appendChild(lengthLabel);

  const combinationsText = document.createElement('span');
  combinationsText.className = 'header__combinations';
  combinationsText.className = 'header__combinations';
  settingsPanel.appendChild(combinationsText);

  const startButton = document.createElement('button');
  startButton.className = 'header__btn--start';
  startButton.textContent = 'Старт раунда';
  headerContainer.appendChild(startButton);

  startButton.addEventListener('click', () => {
    const base = parseInt(baseSelect.value, 10);
    const length = parseInt(lengthSelect.value, 10);

    baseSelect.disabled = true;
    lengthSelect.disabled = true;
    startButton.disabled = true;

    const secretCode = generateSecret(length, base, Math.random);

    console.log(`[Разработка] Загаданное число: ${secretCode}`);
    mainWrap.textContent = '';
    renderGameBoard(mainWrap, secretCode, length, base);
  });

  body.appendChild(header);
  body.appendChild(main);

  const updateUiSettings = () => {
    const selectedBase = parseInt(baseSelect.value, 10);

    if (selectedBase === 2) {
      lengthSelect.value = '2';
    }

    Array.from(lengthSelect.options).forEach((option) => {
      const optionValue = parseInt(option.value, 10);
      if (selectedBase === 2) {
        option.disabled = optionValue !== 2;
      } else {
        option.disabled = false;
      }
    });
    const selectedLength = parseInt(lengthSelect.value, 10);
    const totalSecrets = countPossibleSecrets(selectedLength, selectedBase);
    combinationsText.textContent = ` (Комбинаций: ${totalSecrets})`;
  };

  baseSelect.addEventListener('change', updateUiSettings);
  lengthSelect.addEventListener('change', updateUiSettings);

  updateUiSettings();
};

export const renderGameBoard = (
  container: HTMLElement,
  secretCode: string,
  length: number,
  base: number
): void => {
  const startTime = Date.now();

  const timerBlock = document.createElement('div');
  timerBlock.className = 'game__timer';
  timerBlock.textContent = 'Время раунда: 0 сек.';
  container.appendChild(timerBlock);

  const timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timerBlock.textContent = `Время раунда: ${elapsedSeconds}`;
  }, 1000);

  const inputBlock = document.createElement('div');
  inputBlock.className = 'game__input-block';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'game__input';
  input.placeholder = `Введите ${length} цифр...`;
  input.maxLength = length;
  inputBlock.appendChild(input);

  const submitBtn = document.createElement('button');
  submitBtn.className = 'game__submit-btn';
  submitBtn.textContent = 'Проверить';
  inputBlock.appendChild(submitBtn);

  container.appendChild(inputBlock);

  const errorBlock = document.createElement('div');
  errorBlock.className = 'game__error';
  container.appendChild(errorBlock);

  const historyBlock = document.createElement('div');
  historyBlock.className = 'game__history';

  const historyTitle = document.createElement('h3');
  historyTitle.className = 'game__history-title';
  historyTitle.textContent = 'История попыток';
  historyBlock.appendChild(historyTitle);

  const historyList = document.createElement('div');
  historyList.className = 'game__history-list';
  historyBlock.appendChild(historyList);

  container.appendChild(historyBlock);

  const isValidChar = createDigitValidator(base);

  input.addEventListener('input', () => {
    errorBlock.textContent = '';
    const chars = [...input.value];
    const filteredChars = chars.filter(isValidChar);

    input.value = filteredChars.join('');
  });

  let historyState: Array<{ guess: string; bulls: number; cows: number }> = [];

  submitBtn.addEventListener('click', () => {
    const guess = input.value;
    if (!isValidGuess(guess, length, base)) {
      errorBlock.textContent = `Ошибка! Введите ровно ${length} уникальных числа выбранной системы.`;
      return;
    }

    errorBlock.textContent = '';

    const isDuplicate = historyState.some((entry) => entry.guess === guess);
    if (isDuplicate) {
      errorBlock.textContent = 'Вы уже пробовали это число!';
      return;
    }

    const { bulls, cows } = evaluateGuess(secretCode, guess);

    const newEntry = { guess, bulls, cows };
    historyState = [...historyState, newEntry];

    const item = document.createElement('div');
    item.className = 'game__history-item';

    const guessSpan = document.createElement('span');
    guessSpan.className = 'game__history-guess';
    guessSpan.textContent = guess;

    const resultSpan = document.createElement('span');
    resultSpan.className = 'game__history-result';
    resultSpan.textContent = `Быки: ${bulls}, Коровы: ${cows}`;

    item.appendChild(guessSpan);
    item.appendChild(resultSpan);

    historyList.insertBefore(item, historyList.firstChild);

    input.value = '';
    input.focus();

    if (bulls === length) {
      clearInterval(timerInterval);

      const totalTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
      const totalAttempts = historyState.length;

      input.disabled = true;
      submitBtn.disabled = true;

      const victoryBlock = document.createElement('div');
      victoryBlock.className = 'game__victory-block';

      const victoryTitle = document.createElement('h2');
      victoryTitle.className = 'game__victory-title';
      victoryTitle.textContent = 'Победа!!!';
      victoryBlock.appendChild(victoryTitle);

      const victoryStats = document.createElement('p');
      victoryStats.className = 'game__victory-stats';
      victoryStats.textContent = `Вы угадали число за ${totalAttempts} попыток(тки) и ${totalTimeSeconds} секунд(ы).`;
      victoryBlock.appendChild(victoryStats);

      const newGameBtn = document.createElement('button');
      newGameBtn.className = 'game__new-game-btn';
      newGameBtn.textContent = 'Новая игра';
      victoryBlock.appendChild(newGameBtn);

      container.insertBefore(victoryBlock, container.firstChild);

      newGameBtn.addEventListener('click', () => {
        const baseSelect = document.querySelector('.header__select-base');
        const lengthSelect = document.querySelector('.header__select-length');
        const startBtn = document.querySelector('.header__btn--start');

        if (
          baseSelect instanceof HTMLSelectElement &&
          lengthSelect instanceof HTMLSelectElement &&
          startBtn instanceof HTMLButtonElement
        ) {
          baseSelect.disabled = false;
          lengthSelect.disabled = false;
          startBtn.disabled = false;
        }

        container.textContent = '';
        const welcomeText = document.createElement('p');
        welcomeText.className = 'game__welcome-text';
        welcomeText.textContent =
          'Выберите настройки выше и нажмите кнопку "Старт раунда", чтобы начать игру.';
        container.appendChild(welcomeText);
      });
    }
  });
};
