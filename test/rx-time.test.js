import { jest } from '@jest/globals';
import RxTime from '../utils/rx-time';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('RxTime', () => {
  let rxTime;

  beforeEach(() => {
    // 直接传入模拟的时区
    rxTime = new RxTime('America/New_York');
    dayjs.tz.setDefault('UTC');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    MockDate.reset();
  });

  test('should correctly initialize with user timezone', () => {
    expect(rxTime.userTimezone).toBe('America/New_York');
    expect(rxTime.storedTimezone).toBe('Asia/Shanghai');
  });

  test('should correctly convert time from stored timezone to user timezone', () => {
    MockDate.set('2023-05-01T12:00:00Z');
    const date = new Date('2023-05-01T12:00:00Z');
    const converted = rxTime.convert(date);

    expect(converted.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-05-01 08:00:00');
  });

  test('should correctly format date', () => {
    MockDate.set('2023-05-01T12:00:00Z');

    const date = new Date('2023-05-01T12:00:00Z');
    const formatted = rxTime.format(date, 'YYYY-MM-DD HH:mm:ss');

    expect(formatted).toBe('2023-05-01 08:00:00');
  });

  test('should handle different format strings', () => {
    MockDate.set('2023-05-01T12:00:00Z');

    const date = new Date('2023-05-01T12:00:00Z');
    expect(rxTime.format(date, 'YYYY-MM-DD')).toBe('2023-05-01');
    expect(rxTime.format(date, 'HH:mm:ss')).toBe('08:00:00');
    expect(rxTime.format(date, 'MMM D, YYYY')).toBe('May 1, 2023');
  });
});
