import {create} from 'zustand';
import {createQueueSlice, QueueStore} from './useQueueStore';
import {createTracksSlice, TracksState} from './useTracksStore';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkv} from '@/utils/mmkv';

export interface StoreState extends QueueStore, TracksState {
  _hasHydrated: boolean;
}

export const useStore = create<StoreState>()(
  persist(
    set => ({
      ...createQueueSlice(set),
      ...createTracksSlice(set),
      _hasHydrated: false,
    }),
    {
      name: 'music-player-app-storage',
      storage: createJSONStorage(() => mmkv),
      partialize: state => ({
        tracks: state.tracks,
        artists: state.artists,
        favorites: state.favorites,
        // activeQueueId: state.activeQueueId, // If you want to persist the active queue
      }),
      onRehydrateStorage: () => {
        // This function is called once rehydration is done.
        // It should return a function that mutates the state or undefined.
        return (state, error) => {
          if (error) {
            console.log('An error happened during hydration', error);
          } else if (state) {
            state._hasHydrated = true;
          }
        };
      },
    },
  ),
);
