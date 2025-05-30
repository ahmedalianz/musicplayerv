import {formatSecondsToMinutes, generateTracksListId} from '../formats';

describe('formatSecondsToMinutes', () => {
  it('should format 0 seconds', () =>
    expect(formatSecondsToMinutes(0)).toBe('00:00'));
  it('should format 59 seconds', () =>
    expect(formatSecondsToMinutes(59)).toBe('00:59'));
  it('should format 60 seconds', () =>
    expect(formatSecondsToMinutes(60)).toBe('01:00'));
  it('should format 120 seconds', () =>
    expect(formatSecondsToMinutes(120)).toBe('02:00'));
});

describe('generateTracksListId', () => {
  it('generates ID with search', () =>
    expect(generateTracksListId('Favorites', 'rock')).toBe('Favorites-rock'));
});
