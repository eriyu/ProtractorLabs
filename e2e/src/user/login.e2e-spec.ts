import { browser, element, by, $} from 'protractor';

fdescribe('the user try to login',  () => {
  it('should login to event page', async () => {
    await browser.get('/user/login');
    await element(by.id('userName')).sendKeys('John');
    await element(by.id('password')).sendKeys('123456');
    await element(by.buttonText('登入')).click();
    const actual = await browser.getCurrentUrl();
    console.log('actual', actual);
    expect(actual).toBe(browser.baseUrl + 'events');
  });
  it('should login fail', async () => {
    await browser.get('/user/login');
    await element(by.id('userName')).sendKeys('John');
    await element(by.id('password')).sendKeys('654321');
    await element(by.buttonText('登入')).click();
    const alert = $('div.alert.alert-danger');
    const actual = await alert.isPresent();
    expect(actual).toBe(true);
  });
});
