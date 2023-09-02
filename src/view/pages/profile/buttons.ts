function createButtonsFor(form: HTMLFormElement) {
  const editBtn = document.createElement('button');
  editBtn.classList.add('user-data__password-button');
  editBtn.type = 'button';
  editBtn.textContent = 'Edit';

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Apply';
  submitBtn.type = 'submit';
  submitBtn.className = 'user-data__confirm-button';

  const cancelBtn = document.createElement('button');
  editBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'user-data__reject-button';

  const btnBlock = document.createElement('div');
  btnBlock.classList.add('user-data__button-block');
  btnBlock.append(submitBtn, cancelBtn);

  form.append(editBtn);

  const editMode = (isEdit: boolean) => {
    if (isEdit) {
      editBtn.remove();
      form.append(btnBlock);
      Array.from(form.elements).forEach((element) => {
        const el = element as HTMLInputElement;
        if (el.tagName.toLocaleLowerCase() !== 'button') el.disabled = false;
        if (el.name === 'phone') el.disabled = true;
      });
    } else {
      btnBlock.remove();
      form.append(editBtn);
      Array.from(form.elements).forEach((element) => {
        const el = element as HTMLInputElement;
        if (el.tagName.toLocaleLowerCase() !== 'button') el.disabled = true;
      });
    }
  };
  cancelBtn.addEventListener('click', () => {
    window.dispatchEvent(new Event('DOMContentLoaded'));
    editMode(false);
  });
  editBtn.addEventListener('click', () => editMode(true));
  editMode(false);
}
export default createButtonsFor;
