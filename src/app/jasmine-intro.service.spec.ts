import { JasmineIntroService } from './jasmine-intro.service';

describe('JasmineIntroService', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });

  beforeEach(() => {
    console.log('beforeEach');
  });

  it('should add two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.addNumber(1, 2);

    expect(result).toEqual(3);
  });

  it('should subtract two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.subtractNumber(1, 2);

    expect(result).toEqual(-1);
  });

  it('should multiple two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.multipleNumber(1, 2);

    expect(result).toEqual(2);
  });

  it('should divide two numbers', () => {
    const service: JasmineIntroService = new JasmineIntroService();

    const result = service.divideNumber(1, 2);

    expect(result).toEqual(0.5);
  });

  afterEach(() => {
    console.log('afterEach');
  });

  afterAll(() => {
    console.log('afterAll');
  });
});
