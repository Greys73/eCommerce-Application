export function createProfileBlock(
  fieldName: string,
  value: string,
  inputType: string,
  isEdited: boolean,
): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('user-data__container');
  container.setAttribute('name', fieldName.toLowerCase().replace(' ', '-'));

  const dataBlock = document.createElement('div');
  dataBlock.classList.add('user-data__data-block');

  const description = document.createElement('p');
  description.classList.add('user-data__description');
  description.textContent = fieldName.concat(':');

  const fieldValue = document.createElement('p');
  fieldValue.classList.add('user-data__value');
  fieldValue.textContent = value;

  dataBlock.append(description, fieldValue);

  container.append(dataBlock);

  if (isEdited === true) {
    const input = document.createElement('input');
    input.classList.add('user-data__input');
    if (fieldName.includes('password') === false) {
      input.classList.add('hidden');
    } else {
      description.classList.add('user-data__description_password');
    }
    input.value = value;
    input.type = inputType;

    dataBlock.append(input);

    const errorBlock = document.createElement('p');
    errorBlock.classList.add('user-data__error-block');
    errorBlock.textContent = 'some error';

    container.append(errorBlock);
  }

  return container;
}
