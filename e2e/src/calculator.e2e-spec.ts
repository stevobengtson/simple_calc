import { AppPage } from './app.po';

describe('Calculator App', () => {
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

  it('Should start with a 0 in the display', () => {
    const value = page.getDisplay()
      .getAttribute('value');
    expect(value)
      .toBe('0');
  });

  it('Should perform a simple calculation', () => {
    page.clickKeyButtons(['1', '+', '1', '=']);

    const value = page.getDisplayValue();
    expect(value)
      .toBe('2');
  });

  it('Should perform a complex calculation', () => {
    page.clickKeyButtons(['4', '3', '5']);
    checkValue('435');
    page.clickKeyButtons(['×']);
    checkValue('435');
    page.clickKeyButtons(['3', '9', '4', '8']);
    checkValue('3948');
    page.clickKeyButtons(['+']);
    checkValue('1717380');
    page.clickKeyButtons(['2', '.', '5', '3']);
    checkValue('2.53');
    page.clickKeyButtons(['-']);
    checkValue('1717382.53');
    page.clickKeyButtons(['1', '.', '9', '9']);
    checkValue('1.99');

    page.clickKeyButton('=');
    checkValue('1717380.54');
  });

  it('Should be able to use the back button', () => {
    page.clickKeyButtons(['4', '3', '5']);
    checkValue('435');
    page.clickKeyButtons(['←']);
    checkValue('43');
    page.clickKeyButtons(['←']);
    checkValue('4');
    page.clickKeyButtons(['←']);
    checkValue('0');
  });

  it('should be able to clear the operation', () => {
    page.clickKeyButtons(['1', '+', '2']);
    checkValue('2');

    page.clickKeyButton('C');
    checkValue('0');

    page.clickKeyButton('=');
    checkValue('0');
  });

  it('should accept keyboard input', () => {
    page.keyboardKey(1);
    page.keyboardKey(0);
    page.keyboardKey(2);
    page.keyboardKey(3);
    page.keyboardKey(4);
    page.keyboardKey(5);
    page.keyboardKey(6);
    page.keyboardKey(7);
    page.keyboardKey(8);
    page.keyboardKey(9);

    checkValue('1023456789');
  });
});
