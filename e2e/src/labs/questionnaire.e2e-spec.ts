import { browser, element, by,$ } from 'protractor';

fdescribe('the user submit a questionnaire', () => {
  it('should success', async () => {
    await browser.get('/labs/questionnaire');
    await element(by.name('username')).sendKeys('John');
    await element(by.name('codeLanguage')).sendKeys('C#');
    await element(by.buttonText('送出')).click();
    const actual = await $('form').getText();
    console.log('actual', actual);
    expect(actual).toContain('送出成功');
  });
});
