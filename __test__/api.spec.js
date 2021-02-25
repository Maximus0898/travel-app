import {
  getCity,
  getPixabay,
  getCountry,
  getWeather,
} from '../src/client/js/api';

describe('Testing async functions if async functions defined', () => {
  test('should return true if defined', () => {
    expect(getCity).toBeDefined();
  });
  test('should return true if defined', () => {
    expect(getCountry).toBeDefined();
  });
  test('should return true if defined', () => {
    expect(getWeather).toBeDefined();
  });
  test('should return true if defined', () => {
    expect(getPixabay).toBeDefined();
  });
});
