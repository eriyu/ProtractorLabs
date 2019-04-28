import { browser, by, element, $, $$, ExpectedConditions as EC } from 'protractor';
import * as path from 'path';

fdescribe('練習表單操作 (DatePicker 與檔案上傳)', () => {
  beforeAll(async () => {
  });

  it('導覧到「建立活動」頁面', async () => {
    await browser.get('events/new');
    expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'events/new');
  });

  it('點擊出現 DatePicker', async () => {
    await element(by.className('mat-datepicker-toggle')).click();
    const isPresent = await element(by.className('mat-calendar')).isPresent();
    expect(isPresent).toBe(true);
  });

  it('使用 Datepicker 選擇活動日期 1997/12/31', async () => {
    await element(by.className('mat-calendar-period-button mat-button')).click();
    await element(by.className('mat-calendar-previous-button')).click();
    await element(by.cssContainingText('.mat-calendar-body-cell-content', '1997')).click();
    await element(by.cssContainingText('.mat-calendar-body-cell-content', 'DEC')).click();
    await element(by.cssContainingText('.mat-calendar-body-cell-content', '31')).click();
    const result = await element(by.id('eventDate')).getAttribute('value');
    expect(result).toContain('12/31/1997');
  });

  it('判斷表單值是否全部輸入，按鈕為可以按的狀態', async () => {
    await element(by.id('name')).sendKeys('Protractor 實戰');
    await element(by.id('eventTime')).sendKeys('早上');
    await element(by.id('eventPrice')).sendKeys('500');
    await element(by.id('address')).sendKeys('中正路100號');
    await element(by.id('city')).sendKeys('台北市');
    await element(by.id('country')).sendKeys('台灣');
    await element(by.id('onlineUrl')).sendKeys('http://example.com');
    const imgPath = path.resolve('./e2e/src/assets/Protractor.png');
    await element(by.id('imageFile')).sendKeys(imgPath);
    const isPresent = await element(by.className('btn-success')).isPresent();
    expect(isPresent).toBe(true);
  });

  it('點擊儲存按鈕，驗證活動列表顯示 「Protractor 實戰」 活動', async () => {
    await element(by.className('btn-success')).click();
    // const founds = element.all(by.css('.well.hoverwell.thumbnail'))
    //   .filter((elem, index) => {
    //     return elem.getText().then((text) => {
    //       return text.includes('PROTRACTOR 實戰');
    //     });
    //   });
    // const listcount = await founds.count();
    // expect(listcount).toBeGreaterThan(0);
    const found = element.all(by.css('.well.hoverwell.thumbnail'))
      .filter(async (elem, index) => {
        const text = await elem.getText();
        return text.includes('PROTRACTOR 實戰');
      }).first();
    const isPresent = await found.isPresent();
    expect(isPresent).toBe(true);
  });

});
