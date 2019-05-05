/**
 * 練習切換不同 window 操作
 * http://localhost:4200/user/new
 * – 輸入使用者名稱 mike;輸入密碼 123
 * – 輸入名字 bob;輸入姓氏 joe
 * – 點選 會員權益 會彈出一個全新視窗 (靜態網頁)
 * – 將會員權益視窗捲動到到最底部，並點選 同意 按鈕 – 返回新增會員表單視窗，點選新增
 * – 驗證網址導向 http://localhost:4200/events
 */

import { browser, by, element, $, $$, ExpectedConditions as EC, ElementFinder } from 'protractor';

describe('練習切換不同 window 操作', () => {
    beforeAll(async () => {
    });

    it('導覧到 User New 頁面', async () => {
        await browser.get('user/new');
        expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'user/new');
    });

    it('輸入表單資料 點選會員權益彈出一個全新視窗，驗證視窗有二個', async () => {
      await element(by.id('username')).sendKeys('mike');
      await element(by.id('password')).sendKeys('123');
      await element(by.id('firstName')).sendKeys('bob');
      await element(by.id('lastName')).sendKeys('joe');
      await element(by.id('membershipterm')).click();

      const handles = await browser.getAllWindowHandles();
      expect(2).toBe(handles.length);
    });

    it('驗證切換到的視窗是會員權益', async () => {
      // 設定 關閉 自動等待 NgZone 穩定
      await browser.waitForAngularEnabled(false);

      const handles = await browser.getAllWindowHandles();
      await browser.switchTo().window(handles[1]);
      expect(await browser.getTitle()).toBe('會員權益');
    });

    it('將會員權益視窗捲動到到最底部，點選同意按鈕，驗證視窗只剩一個', async () => {
      await browser.executeScript('window.scrollTo(0, document.body.scrollHeight);');
      await browser.wait(EC.elementToBeClickable($('#accept')), 5000);
      await element(by.id('accept')).click();
      const handles = await browser.getAllWindowHandles();
      expect(1).toBe(handles.length);
    });

    it('返回新增會員表單視窗，點選新增，驗證導向至 Events', async () => {
      // 設定 啟用 自動等待 NgZone 穩定
      await browser.waitForAngularEnabled(true);

      const handles = await browser.getAllWindowHandles();
      await browser.switchTo().window(handles[0]);

      await element(by.id('add')).click();
      expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'events');
    });
});
