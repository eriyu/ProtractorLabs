import { browser, element, by} from 'protractor';

describe('the user try to login', () => {
  it('should login to event page', () => {
    browser.get('/user/login');
    element(by.id('userName')).sendKeys('John');
    element(by.id('password')).sendKeys('123456');
    element(by.buttonText('登入')).click();
    expect(browser.getCurrentUrl()).toContain('events');
  });
  it('should login fail', () => {
    browser.get('/user/login');
    element(by.id('userName')).sendKeys('John');
    element(by.id('password')).sendKeys('654321');
    element(by.buttonText('登入')).click();
    // let fail = element(by.css('div.alert.alert-danger'));
    // expect(fail.getText()).toEqual('錯誤的帳號密碼');
    element(by.css('.col-md-4'))
      .isElementPresent(by.css('div.alert.alert-danger'))
      .then(() => {
        expect(element(by.css('div.alert.alert-danger')).getText()).toEqual('錯誤的帳號密碼');
      });
  });
});
