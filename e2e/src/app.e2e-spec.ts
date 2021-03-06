import { AppPage } from './app.po';
import { browser, logging, element, by, $} from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    // page.navigateTo();
    // expect(page.getTitleText()).toEqual('Protractor 訓練營');
    browser.get(browser.baseUrl);
    const result = element(by.css('div.navbar-header > a')).getText();
    expect(result).toEqual('Protractor 訓練營');
  });

  it('should display crate action page title', () => {
    browser.get('http://localhost:4200/events/new');
    const result = $('h1').getText();
    expect(result).toEqual('建立活動');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
