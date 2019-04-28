import { browser, by, element, $, $$, ExpectedConditions as EC, ElementFinder } from 'protractor';

fdescribe('練習複雜 DOM 定位運用', () => {

  let searchTerm: ElementFinder;
  let searchBtn: ElementFinder;

  beforeAll(async () => {
    searchTerm = element(by.name('searchTerm'));
    searchBtn = element(by.buttonText('搜尋'));
  });

  it('導覧到Event頁面', async () => {
    await browser.get('/events');
    expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'events');
  });

  it('於搜尋文字方塊輸入 Angular', async () => {
    await searchTerm.sendKeys('Angular');
    expect(await searchTerm.getAttribute('value')).toBe('Angular');
  });

  it('驗證畫面上是否出現搜尋結果', async () => {
    await searchBtn.click();
    const isDisplayed = await element(by.id('searchResults')).isDisplayed();
    expect(isDisplayed).toBe(true);
  });

  it('驗證畫面上是否出現 3 個搜尋結果', async () => {
    const listcount = await element.all(by.className('list-group-item')).count();
    expect(listcount).toBe(3);
  });

  it('驗證活動標題是否正確', async () => {
    // const toClickItem = element(by.className('list-group')).element(by.cssContainingText('a', '實戰開發'));
    const toClickItem = element.all(by.css('.list-group > a'))
      .filter((elem, index) => {
        return elem.getText().then((text) => {
          return text.includes('實戰開發');
        });
      })
      .first();
    await toClickItem.click();
    const text = await element(by.tagName('h2')).getText();
    expect(text).toContain('ANGULAR 7 開發實戰：新手入門篇');
  });
});

