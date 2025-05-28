import {create} from 'zustand';
import {createFavoritesSlice, FavoritesState} from './useFavoritesStore';
import {createQueueSlice, QueueStore} from './useQueueStore';
import {createTracksSlice, TracksState} from './useTracksStore';
type StoreState = FavoritesState & QueueStore & TracksState;

export const useStore = create<StoreState>()(set => ({
  ...createFavoritesSlice(set),
  ...createQueueSlice(set),
  ...createTracksSlice(),
}));
