import bothDefaultAddressBlock from '../view/pages/registration/defaultCheckbox';
import registrationForm, {
  addressButton,
  billingAddressBlock,
  shippingAddressBlock,
} from '../view/pages/registration/registration';

const shippingDefaultCheckbox = shippingAddressBlock.children[1]
  .children[1] as HTMLInputElement;

const toggleBlock = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') return;

  if (target.checked === true) {
    shippingDefaultCheckbox.disabled = true;
  } else {
    shippingDefaultCheckbox.disabled = false;
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

let isShown = false;
const toggleBillingAddress = (e: Event) => {
  e.preventDefault();
  const checkbox = bothDefaultAddressBlock.children[1] as HTMLInputElement;
  if (!isShown) {
    addressButton.textContent = 'Hide billing address';
    isShown = true;
    addressButton.after(billingAddressBlock);
    checkbox.disabled = true;
    shippingDefaultCheckbox.disabled = false;
  } else {
    addressButton.textContent = 'Add second address';
    isShown = false;
    billingAddressBlock.remove();
    checkbox.disabled = false;
    checkbox.checked = false;
  }
};
addressButton.addEventListener('click', toggleBillingAddress);