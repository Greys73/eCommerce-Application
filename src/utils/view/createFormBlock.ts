import { FormBlock } from '../../types/type';

const createFormBlock = (options: FormBlock): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = 'form__block';

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
  label.textContent = options.text;
  label.classList.add('form__label');

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('form__error');

  if (input.type === 'checkbox') block.classList.add('form__block_marker');
  if (input.type === 'checkbox') label.classList.add('form__label_marker');
  if (input.type === 'checkbox') input.classList.add('form__input_marker');
  if (input.type === 'checkbox')
    errorMessage.classList.add('form__error_marker');

  block.append(label, input, errorMessage);

  return block;
};

export default createFormBlock;
