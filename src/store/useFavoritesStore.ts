import library from '../../assets/data/library.json';
import {TrackWithPlaylist} from '@/types/TracksList.types';

export interface FavoritesState {
  favorites: TrackWithPlaylist[];
  addToFavorites: (track: TrackWithPlaylist) => void;
  removeToFavorites: (trackId: string) => void;
}

export const createFavoritesSlice = (
  set: (fn: (state: FavoritesState) => Partial<FavoritesState>) => void,
): FavoritesState => ({
  favorites: library.filter(track => track.rating === 1),
  addToFavorites: (track: TrackWithPlaylist) =>
    set(state => ({
      favorites: [...state.favorites, track],
    })),
  removeToFavorites: (trackId: string) =>
    set(state => ({
      favorites: state.favorites.filter(t => t.id !== trackId),
    })),
});
