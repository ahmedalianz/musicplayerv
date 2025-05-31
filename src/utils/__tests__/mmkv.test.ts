import {MMKV} from 'react-native-mmkv';
import {mmkv} from '../mmkv';
import {StateStorage} from 'zustand/middleware';

// Mock MMKV
jest.mock('react-native-mmkv');

describe('MMKV Zustand Storage Adapter', () => {
  const mockStorage = new MMKV();

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset mock implementations before each test
    (mockStorage.set as jest.Mock).mockImplementation(() => {});
    (mockStorage.getString as jest.Mock).mockReturnValue(undefined);
    (mockStorage.delete as jest.Mock).mockImplementation(() => {});
  });

  describe('setItem()', () => {
    it('should handle errors gracefully', () => {
      (mockStorage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Storage failed');
      });

      expect(() => mmkv.setItem('key', 'value')).not.toThrow();
    });
  });

  describe('getItem()', () => {
    it('should return null for non-existent keys', () => {
      (mockStorage.getString as jest.Mock).mockReturnValue(undefined);
      expect(mmkv.getItem('nonExistentKey')).toBeNull();
    });

    it('should return null when MMKV returns undefined', () => {
      (mockStorage.getString as jest.Mock).mockReturnValue(undefined);
      expect(mmkv.getItem('undefinedKey')).toBeNull();
    });
  });

  describe('removeItem()', () => {
    it('should handle errors gracefully', () => {
      (mockStorage.delete as jest.Mock).mockImplementation(() => {
        throw new Error('Deletion failed');
      });

      expect(() => mmkv.removeItem('key')).not.toThrow();
    });
  });

  describe('TypeScript Interface Compliance', () => {
    it('should match StateStorage interface for setItem', () => {
      const storage: StateStorage = mmkv;
      expect(typeof storage.setItem).toBe('function');
    });

    it('should match StateStorage interface for getItem', () => {
      const storage: StateStorage = mmkv;
      expect(typeof storage.getItem).toBe('function');
    });

    it('should match StateStorage interface for removeItem', () => {
      const storage: StateStorage = mmkv;
      expect(typeof storage.removeItem).toBe('function');
    });
  });
});
