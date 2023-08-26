import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom'
import registrationPage from '../../src/view/pages/registration/registration'
import { changeStyle, checkPassword } from '../../src/controller/errorHanlders'
import loginPage from '../../src/view/pages/login/login'
import resultMessage from '../../src/view/pages/login/resultMessage'

describe('check controllers', () => {
  test('Password validation', () => {
    const firstPasswordInput = registrationPage.querySelector('[placeholder="Password"]') as HTMLInputElement
    const errorMessage = firstPasswordInput.nextElementSibling;
    fireEvent.input(firstPasswordInput, { target: {
      value: '123'
    }});
    expect(errorMessage).toHaveTextContent('Password must be at least 8 characters long');
    fireEvent.input(firstPasswordInput, { target: {
      value: '12345678'
    }});
    expect(errorMessage).toHaveTextContent('Password must contain at least one uppercase letter (A-Z)');
    let changedInput = registrationPage.querySelector('[placeholder="Password"]') as HTMLInputElement;
    expect(changedInput).toHaveClass('invalid')
    fireEvent.input(firstPasswordInput, { target: {
      value: '12345AAaa'
    }});
    changedInput = registrationPage.querySelector('[placeholder="Password"]') as HTMLInputElement;
    expect(changedInput).toHaveClass('valid')

    const secondPassword = registrationPage.querySelector('[placeholder="Repeat password"]') as HTMLInputElement;
    fireEvent.input(secondPassword, { target: {
      value: '12345AAaaa'
    }});
    const isEqual = checkPassword(changedInput)
    expect(isEqual).toBeFalsy();
    const errMess = secondPassword.nextElementSibling;
    expect(errMess).toHaveTextContent('Must match the password')

  })

  test ('redirection to login page', () => {
    const link = registrationPage.querySelector('a') as HTMLAnchorElement;
    fireEvent.click(link);
    expect(registrationPage).not.toBeInTheDocument();
  })

  test('input to change style', () => {
    const firstPasswordInput = registrationPage.querySelector('[placeholder="Password"]') as HTMLInputElement;
    const expected = changeStyle(firstPasswordInput, true);
    expect(firstPasswordInput).toHaveClass('valid');
    expect(expected).toBeUndefined()
    changeStyle(firstPasswordInput, false);
    expect(firstPasswordInput).toHaveClass('invalid');
  })

  test('show message after login', () => {
    const logBtn = loginPage.querySelector('button') as HTMLButtonElement;
    const mailInput = loginPage.querySelector('[type="email"]') as HTMLInputElement;
    const passInput = loginPage.querySelector('[type="email"]') as HTMLInputElement;
    mailInput.value = 'aa@aaa.aa'
    passInput.value = '1Aaaaaaa'
    fireEvent.click(logBtn)
    setTimeout(() => {
      expect(resultMessage).not.toHaveClass('hidden');
    }, 0)
  })

  test('select validation', () => {
    const select = registrationPage.querySelector('select') as HTMLSelectElement;
    fireEvent.change(select);
    expect(select).toHaveClass('valid');
  })
})
