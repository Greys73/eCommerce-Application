const resultMessage = document.createElement('div');
resultMessage.classList.add('login-form__result-container', 'hidden');

const resultText = document.createElement('p');
resultText.classList.add('login-form__result-text');
resultText.textContent = 'Successfuly login';

resultMessage.append(resultText);

export default resultMessage;
