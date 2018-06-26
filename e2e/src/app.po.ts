// tslint:disable-next-line:no-implicit-dependencies
import { browser, by, element, ElementArrayFinder, ElementFinder, promise, sendKeys } from 'protractor';

export class AppPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  keyboardKey(keyValue: protractor.Key): void {
    element(by.css('body'))
      .sendKeys(keyValue);
  }

  clickKeyButton(buttonText: string): void {
    this.getKeyButton(buttonText)
      .click();
  }

  clickKeyButtons(buttonTexts: Array<string>): void {
    buttonTexts.forEach((buttonText: string) => this.clickKeyButton(buttonText));
  }

  getKeyButton(text: string): ElementFinder {
    return element(by.cssContainingText('button.key', text));
  }

  getDisplay(): ElementFinder {
    return element(by.css('input[name="display"]'));
  }

  getDisplayValue(): string {
    return this.getDisplay()
      .getAttribute('value');
  }

  clickHistoryClearButton(): void {
    element(by.cssContainingText('button', 'Clear'))
      .click();
  }

  getHistoryLogItems(): ElementArrayFinder {
    return element.all(by.css('li.history-log'));
  }
}
