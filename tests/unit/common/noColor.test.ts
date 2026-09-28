import { isNoColorEnabled } from '../../../src/common/noColor';

describe('noColor (issue #250)', () => {
  const original = process.env.NO_COLOR;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NO_COLOR;
    } else {
      process.env.NO_COLOR = original;
    }
  });

  it('is disabled when NO_COLOR is unset', () => {
    delete process.env.NO_COLOR;
    expect(isNoColorEnabled()).toBe(false);
  });

  it('is enabled when NO_COLOR is set to any non-empty value', () => {
    process.env.NO_COLOR = '1';
    expect(isNoColorEnabled()).toBe(true);
    process.env.NO_COLOR = '';
    expect(isNoColorEnabled()).toBe(false);
  });
});
