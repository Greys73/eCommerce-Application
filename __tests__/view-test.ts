
import { JSDOM } from 'jsdom'
import { getAllByRole, getByRole, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom'

import countries from "../src/model/data/countries"
import createFormBlock from '../src/utils/view/createFormBlock'
import registrationPage, { addressButton } from '../src/view/pages/registration/registration'
import mainPage from '../src/view/pages/main/main'
import page404 from '../src/view/pages/404/404'


test('Amount of countries', () => {
  expect(Object.keys(countries).length).toBe(27)
})

describe('Registration page tests', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body

  test ('Regform contains message', () => {
    container.innerHTML = `<div class="reg-form__result-container hidden"><p class="reg-form__result-text">Successfuly registrated</p></div>`

    expect(getByText(container,'Successfuly registrated')).toBeInTheDocument();
  })

  test('Regform contains proper e-mail block', () => {
    const emailOptions = {
      type: 'email',
      placeholder: 'E-mail',
      name: 'email',
      text: 'E-mail:',
      required: true,
      pattern: /.+@.+\..+/,
      title: 'Type valid e-mail (e.g., example@email.com)',
    };
    const expected = createFormBlock(emailOptions)

    const mailBlock = registrationPage.querySelectorAll('.form__block')[0]
    expect(mailBlock).toEqual(expected);

  })

  test('Address button is enabled', () => {
    const btn = addressButton.outerHTML;
    container.innerHTML = btn || '';
    expect(container).toBeEnabled();
  })
})

describe('Main page tests', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body
  container.innerHTML = mainPage.outerHTML;
  test('Link is on the page', () => {
    expect(getByRole(container, 'link')).toBeInTheDocument();
  })

  test('Contains only one h1', () => {
    expect(getAllByRole(container, 'heading').length).toBe(1)
  })
})

describe('404 page tests', () => {
  const dom = new JSDOM(`<html></head><body></body></html>`)
  const container = dom.window.document.body
  container.innerHTML = page404.outerHTML;
  test('link to main page is visible', () => {
    expect(getByRole(container, 'link')).toBeVisible();
  })
})
