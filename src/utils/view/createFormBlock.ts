import {
  inputValidationErrorHandler,
  selectValidationHandler,
} from '../../controller/errorHanlders';
import { FormBlock } from '../../types/type';

function createSelectBlock(options: FormBlock): HTMLDivElement {
  const block = document.createElement('div');
  block.className = 'form__block';

  const container = document.createElement('div');
  container.classList.add('form__flex-container');

  const label = document.createElement('label');
  label.htmlFor = options.name;
  label.textContent = options.text;
  label.classList.add('form__label');

  const select = document.createElement('select');
  select.name = options.name;
  select.title = options.title || '';
  select.classList.add('form__input', 'selection__country');

  const error = document.createElement('p');
  error.classList.add('form__error');

  container.append(label, select);

  block.append(container, error);

  if (options.selectOptions) {
    options.selectOptions.forEach((el) => {
      const option = document.createElement('option');
      option.value = el;
      option.textContent = el;
      select.append(option);
    });
  }

  select.addEventListener('change', selectValidationHandler);

  return block;
}

const createFormBlock = (options: FormBlock): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = 'form__block';

  if (options.type === 'select') return createSelectBlock(options);

  const input = document.createElement('input');
  input.type = options.type;
  input.name = options.name;
  input.required = options.required;
  input.classList.add('form__input');
  if (block.className === 'checkbox') input.classList.add('form__input_marker');
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.pattern) input.pattern = options.pattern.source;
  if (options.max) input.max = options.max;
  if (options.title) input.title = options.title;

  const label = document.createElement('label');
  label.htmlFor = options.name;
  if (options.text) label.textContent = options.text;
  label.classList.add('form__label');

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('form__error');

  if (input.type === 'checkbox') block.classList.add('form__block_marker');
  if (input.type === 'checkbox') label.classList.add('form__label_marker');
  if (input.type === 'checkbox') input.classList.add('form__input_marker');
  if (input.type === 'checkbox')
    errorMessage.classList.add('form__error_marker');

  if (options.type === 'date' || options.display === 'inline') {
    const flexCont = document.createElement('div');
    flexCont.className = 'form__flex-container';
    flexCont.append(label, input);
    block.append(flexCont, errorMessage);
    input.classList.add('selection__country');
  } else {
    block.append(label, input, errorMessage);
  }

  input.addEventListener('input', inputValidationErrorHandler);

  return block;
};

export default createFormBlock;
