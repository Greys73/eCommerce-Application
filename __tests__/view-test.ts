
import { JSDOM } from 'jsdom'
import { getByText } from '@testing-library/dom'
import '@testing-library/jest-dom'

import countries from "../src/model/data/countries"


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
})
