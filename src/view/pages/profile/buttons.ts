function createButtonsFor(form: HTMLFormElement) {
  const editBtn = document.createElement('button');
  editBtn.classList.add('user-data__password-button');
  editBtn.type = 'button';
  editBtn.textContent = 'Edit';

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'apply';
  submitBtn.type = 'submit';
  submitBtn.className = 'reg-page__button';

  const cancelBtn = document.createElement('button');
  editBtn.type = 'button';
  cancelBtn.textContent = 'cancel';
  cancelBtn.className = 'reg-page__button';

  const btnBlock = document.createElement('div');
  btnBlock.append(submitBtn, cancelBtn);

  form.append(editBtn);

  const editMode = (mode: boolean) => {
    if (mode) {
      editBtn.remove();
      form.append(btnBlock);
      Array.from(form.elements).forEach((element) => {
        const el = element as HTMLInputElement;
        if (el.tagName.toLocaleLowerCase() !== 'button') el.disabled = false;
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
  cancelBtn.addEventListener('click', () => editMode(false));
  editBtn.addEventListener('click', () => editMode(true));
  editMode(false);
}
export default createButtonsFor;
