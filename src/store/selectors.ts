import {useStore} from './useStore';

export const useFavorites = () =>
  useStore(state => ({
    favorites: state.favorites,
    addToFavorites: state.addToFavorites,
    removeToFavorites: state.removeToFavorites,
  }));
export const useTracks = () => useStore(state => ({tracks: state.tracks}));
