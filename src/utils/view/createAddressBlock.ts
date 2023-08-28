import countries from '../../model/data/countries';
import { AddressType, FormBlock } from '../../types/type';
import bothDefaultAddressBlock from '../../view/pages/registration/defaultCheckbox';
import createFormBlock from './createFormBlock';

const createAddressBlock = (addressType: AddressType): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = `reg-form__address ${addressType}`;

  const defaultAddressBlock = createFormBlock({
    type: 'checkbox',
    name: `default${addressType}Address`,
    text: `Assign this address as default ${addressType}`,
    required: false,
    placeholder: '',
  });

  const streetOptions: FormBlock = {
    type: 'text',
    text: 'Address:',
    name: `${addressType}Street`,
    required: true,
    pattern: /.+/,
    title: 'Must contain at least one character',
    placeholder: 'Address (Street, Building, etc)',
  };

  const cityOptions: FormBlock = {
    type: 'text',
    text: 'City:',
    name: `${addressType}City`,
    required: true,
    pattern: /[A-Za-z]+/,
    title:
      'Must contain at least one character and no special characters or numbers',
    placeholder: 'City',
  };

  const postCodeOptions: FormBlock = {
    type: 'text',
    text: 'Postal code:',
    name: `${addressType}PostCode`,
    required: true,
    pattern: /[0-9]{5,7}/,
    title: 'Must contain from 5 to 7 digits',
    placeholder: 'Postal code (5-7 digits)',
  };

  const city = createFormBlock(cityOptions);
  const street = createFormBlock(streetOptions);
  const postCode = createFormBlock(postCodeOptions);

  const countryBlock = document.createElement('div');
  countryBlock.classList.add('form__block');

  const countryContainer = document.createElement('div');
  countryContainer.classList.add('form__flex-container');

  const countryLabel = document.createElement('label');
  countryLabel.htmlFor = `${addressType}Country`;
  countryLabel.textContent = 'Country:';
  countryLabel.classList.add('form__label');

  const countrySelection = document.createElement('select');
  countrySelection.name = `${addressType}Country`;
  countrySelection.title = 'You should select a country to save this address';
  countrySelection.classList.add('form__input', 'selection__country');

  const countryMessage = document.createElement('p');
  countryMessage.classList.add('form__error');

  countryContainer.append(countryLabel, countrySelection);

  countryBlock.append(countryContainer, countryMessage);

  Object.keys(countries).forEach((el) => {
    const option = document.createElement('option');
    option.value = el;
    option.textContent = el;
    countrySelection.append(option);
  });

  block.append(countryBlock, city, street, postCode, defaultAddressBlock);

  if (addressType === 'shipping') {
    block.append(bothDefaultAddressBlock);
  }

  return block;
};

export default createAddressBlock;
