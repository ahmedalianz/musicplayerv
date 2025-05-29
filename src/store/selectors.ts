import {useShallow} from 'zustand/shallow';
import {useStore} from './useStore';

export const useFavorites = () => useStore(state => state.favorites);
export const useTracks = () => useStore(state => state.tracks);
export const useQueue = () => useStore(state => state.activeQueueId);
export const useArtists = () => useStore(state => state.artists);
// export const usePlaylists = () => useStore(state => state.playlists);
export const useTracksActions = () =>
  useStore(
    useShallow(state => ({
      fetchDeviceTracks: state.fetchDeviceTracks,
    })),
  );
export const useFavoriteActions = () =>
  useStore(
    useShallow(state => ({
      toggleTrackFavorite: state.toggleTrackFavorite,
    })),
  );
// export const usePlaylistActions = () =>
//   useStore(
//     useShallow(state => ({
//       addToPlaylist: state.addToPlaylist,
//       removeFromPlaylist: state.removeFromPlaylist,
//     })),
//   );

export const useQueueActions = () =>
  useStore(useShallow(state => ({setActiveQueueId: state.setActiveQueueId})));
export const useIsStoreHydrated = () => useStore(state => state._hasHydrated);
