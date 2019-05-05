/**
 * browser.wait 進階應用
 * http://localhost:4200/labs/captcha
 * – 等待手動輸入四碼驗證碼
 * – 輸入四碼驗證碼後，測試自動點選 送出 – 驗證畫面上顯示 驗證碼正確
 */
import { browser, by, element, $, $$, ExpectedConditions as EC } from 'protractor';

function waitForTyping() {
  return new Promise(function(resolve, reject) {
    const interval = setInterval(() => {
        element(by.name('captchaCode')).getAttribute('value').then(val => {
          if (val.length === 4) {
            clearInterval(interval);
            resolve('輸入完畢');
          }
        });
    }, 500);
  });
}

describe('the user submit a questionnaire', () => {
  beforeAll(async () => {
  });

  it('導覧到 驗證碼 頁面', async () => {
      await browser.get('labs/captcha');
      expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'labs/captcha');
  });

  it('等待手動輸入四碼驗證碼', async () => {
    await browser.wait(waitForTyping , 10000, '等待輸入驗證碼');
    const value = await element(by.name('captchaCode')).getAttribute('value');
    expect(value.length).toBe(4);
  });

  it('輸入四碼驗證碼後，測試自動點選 送出 – 驗證畫面上顯示 驗證碼正確', async () => {
    await element(by.buttonText('送出')).click();
    const formText = await element(by.tagName('form')).getText();
    expect(formText).toContain('驗證碼正確');
  });
});
