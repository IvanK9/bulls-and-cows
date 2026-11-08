import { countPossibleSecrets } from '../core/game.js';

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
  const mainContainer = document.createElement('div');
  mainContainer.className = 'main__wrap';
  mainContainer.id = 'game-area';
  main.appendChild(mainContainer);

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
