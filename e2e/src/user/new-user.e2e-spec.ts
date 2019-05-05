/**
 * 練習 window 彈出視窗操作
 * http://localhost:4200/events/new
 * – 點選取消按鈕
 * – 點選 window 彈出視窗 確定
 * – 驗證導頁到 http://localhost:4200/events
 */

import { browser, by, element, $, $$, ExpectedConditions as EC, ElementFinder } from 'protractor';

describe('練習 window 彈出視窗操作', () => {

    beforeAll(async () => {
    });

    it('導覧到 Event New 頁面', async () => {
        await browser.get('/events/new');
        expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'events/new');
    });

    it('點選取消按鈕 點選 window 彈出視窗 確定 驗證導頁到 http://localhost:4200/events', async () => {
        const cancelBtn = element(by.buttonText('取消'));
        await cancelBtn.click();
        await browser.wait(EC.alertIsPresent(), 5000);
        await browser.switchTo().alert().accept();
        expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + 'events');
    });
});
