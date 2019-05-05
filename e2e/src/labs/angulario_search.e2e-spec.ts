import { browser, by, element, $, $$, ExpectedConditions as EC } from 'protractor';

fdescribe('練習 ExpectedCondition', () => {

  // 搜尋條件輸入 ngzone
  // 等待搜尋畫面
  // 點擊 NgZone 連結
  // 檢查頁面標題出現 NgZone 字樣

  const searchResultsElement = element(by.className('search-results'));

  beforeAll(async () => {
  });

  it('要導覧至 angular.io', async () => {
    await browser.driver.get('https://angular.io/');
    expect(await browser.getCurrentUrl()).toBe('https://angular.io/');
  });

  it('搜尋條件輸入 ngzone 等待搜尋畫面', async () => {
    await element(by.css('.search-container [type=search]')).sendKeys('ngzone');
    const wait = EC.textToBePresentInElement($('.search-results'), 'NgZone');
    await browser.wait(wait, 5000);
    const searchResult = await searchResultsElement.getText();
    expect(searchResult).toContain('NgZone');
  });

  it('點擊 NgZone 連結 檢查頁面標題出現 NgZone 字樣', async () => {
    await element(by.linkText('NgZone')).click();
    const wait = EC.textToBePresentInElement(element(by.id('ngzone')), 'NgZone');
    await browser.wait(wait, 5000);
    expect(await browser.getTitle()).toContain('NgZone');
  });
});
