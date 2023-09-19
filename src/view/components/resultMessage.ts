const resultMessage = document.createElement('div');
resultMessage.classList.add('reg-form__result-container', 'hidden');

const resultText = document.createElement('p');
resultText.classList.add('reg-form__result-text');
resultText.textContent = '';

resultMessage.append(resultText);

document.body.append(resultMessage);

export default resultMessage;
