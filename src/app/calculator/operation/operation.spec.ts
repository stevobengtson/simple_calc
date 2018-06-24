import { Operation, Operations } from './operation';

describe('Operation', () => {
  it('should add a value', () => {
    const operation = new Operation(5, Operations.ADD, 5);
    expect(operation.result)
      .toBe(10);
  });

  it('should subtract a value', () => {
    const operation = new Operation(5, Operations.SUBTRACT, 5);
    expect(operation.result)
      .toBe(0);
  });

  it('should multiply a value', () => {
    const operation = new Operation(5, Operations.MULTIPLY, 5);
    expect(operation.result)
      .toBe(25);
  });

  it('should divide a value', () => {
    const operation = new Operation(5, Operations.DIVIDE, 5);
    expect(operation.result)
      .toBe(1);
  });

  it('should clear a value', () => {
    const operation = new Operation(5, Operations.CLEAR);
    expect(operation.result)
      .toBe(0);
  });

  it('should get the operation', () => {
    const operation = new Operation(5, Operations.ADD, 5);
    expect(operation.operation)
      .toBe(Operations.ADD);
  });

  it('should get the operation value', () => {
    const operation = new Operation(5, Operations.ADD, 6);
    expect(operation.operationValue)
      .toBe(6);
  });

  it('should throw an exception if an unsupported operation supplied', () => {
    expect(() => {
      const operation = new Operation(5, Operations.EXECUTE);
      expect(operation.result)
        .toBeUndefined();
    })
    .toThrowError();
  });
});
