import { browser, element, by } from 'protractor';
import * as blueharvest from 'blue-harvest';
import { compareScreenshot, addMask } from 'blue-harvest';

describe('練習遮罩動態圖的呈現測試', () => {
  it('should compare gif lab page', async () => {
    await browser.get('labs/gif');
    const golden = `e2e/goldens/giflab.png`;
    const diffDir = 'e2e/goldens/';
    const gif_img = element(by.id('gif-img'));
    await addMask(gif_img, 'gray');
    const actual = await browser.takeScreenshot();
    const result = await compareScreenshot(actual, golden, diffDir);
    expect(result).toBeTruthy();
  });
});
