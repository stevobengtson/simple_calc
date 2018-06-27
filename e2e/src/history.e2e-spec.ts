import { AppPage } from './app.po';

describe('History App', () => {
  let page: AppPage;
  const checkValue = (check: string) => {
    const value = page.getDisplayValue();
    expect(value)
      .toBe(check);
  };

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should log a history action', () => {
    page.clickKeyButtons(['1', '2', '3', '+', '3', '2', '1', '=']);
    checkValue('444');
    page.clickKeyButtons(['3', '2', '1', '-', '1', '2', '3', '=']);
    checkValue('198');

    const logCount = page.getHistoryLogItems()
      .count();

    expect(logCount)
      .toBe(2);
  });
});
