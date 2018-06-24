import { NumberBuilder } from './number-builder';

describe('Builder', () => {
  let builder: NumberBuilder;

  beforeEach(() => {
    builder = new NumberBuilder();
  });

  it('should return 0 with nothing added', () => {
    expect(builder.value)
      .toBe(0);
  });

  it('should add numbers', () => {
    builder.pushNumber(1);
    expect(builder.value)
      .toBe(1);
    builder.pushNumber(2);
    expect(builder.value)
      .toBe(12);
    builder.pushNumber(3);
    expect(builder.value)
      .toBe(123);
  });

  it('should remove numbers', () => {
    builder.value = 123.4;

    builder.pop();
    expect(builder.value)
      .toBe(123.0);
    builder.pop();
    expect(builder.value)
      .toBe(123);
    builder.pop();
    expect(builder.value)
      .toBe(12);
    builder.pop();
    expect(builder.value)
      .toBe(1);
    builder.pop();
    expect(builder.value)
      .toBe(0);
  });

  it('should clear the builder', () => {
    builder.value = 1.0;
    builder.clear();
    expect(builder.value)
      .toBe(0.0);
  });

  describe('Decimals', () => {
    it('should add a decimal and return 0.0', () => {
      builder.pushDecimal();
      expect(builder.value)
        .toBe(0.0);
    });

    it('should add a decimal after a number 1 and return 1.0', () => {
      builder.pushNumber(1);
      builder.pushDecimal();
      expect(builder.value)
        .toBe(1.0);
    });

    it('should add a decimal then a number 1 and return 0.1', () => {
      builder.pushDecimal();
      builder.pushNumber(1);
      expect(builder.value)
        .toBe(0.1);
    });
  });
});
