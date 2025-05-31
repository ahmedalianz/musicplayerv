import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

const storage = new MMKV();

export const mmkv: StateStorage = {
  setItem: (name: string, value: string): void | Promise<void> => {
    return storage.set(name, value);
  },
  getItem: (
    name: string
  ): string | null | undefined | Promise<string | null | undefined> => {
    const value = storage.getString(name);
    return value === undefined ? null : value;
  },
  removeItem: (name: string): void | Promise<void> => {
    return storage.delete(name);
  },
};
