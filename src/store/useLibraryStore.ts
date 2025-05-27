import {LibraryState} from '@/types/Library.types';
import {create} from 'zustand';
import library from '../../assets/data/library.json';
const useLibraryStore = create<LibraryState>(set => ({
  tracks: library,
  toggleFavorite: () => {},
  addToPlaylist: () => {},
}));
export const useTracks = () => useLibraryStore(state => state.tracks);
export const useFavorites = () => {
  const favorites = useLibraryStore(state =>
    state.tracks.filter(track => track.rating === 1),
  );
  const toggleFavorite = useLibraryStore(state => state.toggleFavorite);
  return {favorites, toggleFavorite};
};
export default useLibraryStore;
