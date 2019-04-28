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
    let fail = element(by.css('.alert-danger'));
    expect(fail.getText()).toEqual('錯誤的帳號密碼');
  });
});
