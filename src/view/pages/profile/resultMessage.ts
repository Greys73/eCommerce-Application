const resultMessage = document.createElement('div');
resultMessage.classList.add('user-data__result-container', 'hidden');

const resultText = document.createElement('p');
resultText.classList.add('user-data__result-text');
resultText.textContent = 'Success';

resultMessage.append(resultText);

export default resultMessage;
