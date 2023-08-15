import bothDefaultAddressBlock from '../view/pages/registration/defaultCheckbox';
import registrationForm from '../view/pages/registration/registration';

const toggleBlock = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;
  const billingInputs = [
    ...registrationForm.querySelectorAll('.billing input'),
  ] as HTMLInputElement[];
  const billingSelect = registrationForm.querySelector(
    '.billing select',
  ) as HTMLSelectElement;
  const billingElems = [...billingInputs, billingSelect];

  if (target.checked === true) {
    billingElems.forEach((el) => {
      const input = el;
      input.disabled = true;
    });
  } else {
    billingElems.forEach((el) => {
      const input = el;
      input.disabled = false;
    });
  }
};
bothDefaultAddressBlock.addEventListener('click', toggleBlock);

const passwordCheckboxes = [
  ...registrationForm.querySelectorAll('[name = showPassword]'),
] as HTMLInputElement[];
const passwordInputs = [
  ...registrationForm.querySelectorAll('[type = password]'),
] as HTMLInputElement[];

const showPassword = (i: number) => {
  const chkBox = passwordCheckboxes[i];
  const input = passwordInputs[i];
  input.type = chkBox.checked ? 'text' : 'password';
};

passwordCheckboxes.forEach((checkbox, i) => {
  checkbox.addEventListener('click', () => showPassword(i));
});
