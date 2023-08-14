import { FormBlock } from '../../types/type';

const createFormBlock = (options: FormBlock): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = 'reg-form__block';
  const input = document.createElement('input');
  input.type = options.type;
  if (options.placeholder) input.placeholder = options.placeholder;
  input.name = options.name;
  input.required = options.required;
  if (options.pattern) input.pattern = options.pattern.source;
  if (options.max) input.max = options.max;
  if (options.title) input.title = options.title;

  const label = document.createElement('label');
  label.htmlFor = options.name;
  label.textContent = options.text;
  const errorMessage = document.createElement('p');
  block.append(label, input, errorMessage);
  return block;
};

export default createFormBlock;
