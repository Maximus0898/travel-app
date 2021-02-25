import { handleSubmit, postData, updateUI } from '../src/client/js/app';

describe('Testing handleSubmit() function', () => {
  test('should return true if function is defined', () => {
    expect(handleSubmit).toBeDefined();
  });

  test('should return true', () => {
    expect(postData).toBeDefined();
  });

  test('should return true', () => {
    expect(updateUI).toBeDefined();
  });
});
