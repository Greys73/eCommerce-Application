import loginPage from '../../src/view/pages/login/login';
import { header, navObj } from '../../src/view/header/header';

// loginPage, header, footer


describe('login page tests', () => {
  describe('result message tests', () => {
    const message = loginPage.querySelector('.login-form__result-container');
    test('LoginPage contains message', () => {
      expect(message).toBeDefined();
    });

    test('LoginPage message is not visable', () => {
      expect(message?.classList.contains('hidden')).toBeTruthy();
    });

    test('LoginPage message has <p>-child for result', () => {
      expect(message?.firstElementChild?.tagName).toEqual('P');
    });
  });

  describe('redirect link tests', () => {
    const redirectBlock = loginPage.querySelector('.login-page__redirect');
    test('LoginPage contains redirect elements', () => {
      expect(redirectBlock).toBeDefined();
    });
    test('redirect element contain link', () => {
      expect(redirectBlock?.firstElementChild?.tagName).toEqual('A')
    });

    const link = redirectBlock?.firstElementChild as HTMLLinkElement;
    test('redirect link leads to the registration page', () => {
      expect(link.href).toContain('/registration');
    });
  });

  describe('form tests', () => {
    const form = loginPage.querySelector('.login-page__form');

    function testFormInput(type: string): number {
      let cnt = 0;
      form?.querySelectorAll('input').forEach(el => {
        if (el.type === type) {
          cnt += 1;
        }
      })
      return cnt;
    }

    test('LoginPage contains form', () => {
      expect(form).toBeDefined();
    });

    test('form contains email input', () => {
      expect(testFormInput('email')).toBeGreaterThan(0);
    });

    test('form contains password input', () => {
      expect(testFormInput('password')).toBeGreaterThan(0);
    });

    test('form contains log in button', () => {
      expect(form?.querySelectorAll('button').length).toBeGreaterThan(0);
    });
  });
})

describe('login page tests', () => {
  describe('result message tests', () => {
    const message = loginPage.querySelector('.login-form__result-container');
    test('LoginPage contains message', () => {
      expect(message).toBeDefined();
    });

    test('LoginPage message is not visable', () => {
      expect(message?.classList.contains('hidden')).toBeTruthy();
    });

    test('LoginPage message has <p>-child for result', () => {
      expect(message?.firstElementChild?.tagName).toEqual('P');
    });
  });

  describe('redirect link tests', () => {
    const redirectBlock = loginPage.querySelector('.login-page__redirect');
    test('LoginPage contains redirect elements', () => {
      expect(redirectBlock).toBeDefined();
    });
    test('redirect element contain link', () => {
      expect(redirectBlock?.firstElementChild?.tagName).toEqual('A')
    });

    const link = redirectBlock?.firstElementChild as HTMLLinkElement;
    test('redirect link leads to the registration page', () => {
      expect(link.href).toContain('/registration');
    });
  });

  describe('form tests', () => {
    const form = loginPage.querySelector('.login-page__form');

    function testFormInput(type: string): number {
      let cnt = 0;
      form?.querySelectorAll('input').forEach(el => {
        if (el.type === type) {
          cnt += 1;
        }
      })
      return cnt;
    }

    test('LoginPage contains form', () => {
      expect(form).toBeDefined();
    });

    test('form contains email input', () => {
      expect(testFormInput('email')).toBeGreaterThan(0);
    });

    test('form contains password input', () => {
      expect(testFormInput('password')).toBeGreaterThan(0);
    });

    test('form contains log in button', () => {
      expect(form?.querySelectorAll('button').length).toBeGreaterThan(0);
    });
  });
});

// header

describe('header tests', () => {
  describe('header container', () => {
    test('header contains logo container', () => {
      expect(header.querySelector('.header__container')).toBeDefined();
    });
  });

  describe('logo tests', () => {
    const logo = header.querySelector('.header__logo');

    test('header contains logo container', () => {
      expect(logo).toBeDefined();
    });

    test('logo container contains image', () => {
      expect(logo?.querySelectorAll('img').length).toBeGreaterThan(0);
    });

    test('logo image has alt', () => {
      expect((logo?.querySelector('img')?.alt.length)).toBeGreaterThan(0);
    });
  });

  describe('nav tests', () => {
    const nav = header.querySelector('.header__nav');

    test('header contains nav', () => {
      expect(nav).toBeDefined();
    });

    test('nav container contains links', () => {
      expect(nav?.querySelectorAll('a').length).toBeGreaterThan(0);
    });

    function checkLink(id: string, routing: string): boolean {
      const link = nav?.querySelector(`#${id}`) as HTMLLinkElement;
      if (link.href.includes(routing)) {
        return true;
      }
      return false;
    }

    const linksArr = [
      ['main-page', '/'],
      ['products', '/products'],
      ['basket', '/basket'],
      ['about', '/about'],
      ['sigin', '/registration'],
      ['login', '/login'],
      ['profile', '/profile'],
      ['logout', '/logout'],
    ]

    linksArr.forEach(el => {
      test(`nav link ${el[0]} exists with correct route`, () => {
        expect(checkLink(el[0], el[1])).toBeTruthy();
      });
    })

    Object.entries(navObj).forEach(([key, value]) => {
      test(`nav obj ${key} exists`, () => {
        expect(key).toBeDefined();
      });
      test(`nav obj ${key} has element text`, () => {
        expect(value.text).toBeDefined();
      });
      test(`nav obj ${key} has element routing`, () => {
        expect(value.routing).toBeDefined();
      });
    })
  });
});