import bothDefaultAddressBlock from '../view/pages/registration/defaultCheckbox';
import registrationForm from '../view/pages/registration/registration';

const disableBlock = (e: Event) => {
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
bothDefaultAddressBlock.addEventListener('click', disableBlock);
