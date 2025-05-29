import {Track} from 'react-native-track-player';
import getMusicFiles from '@/utils/getMusicFiles';
import {Artist} from '@/types/Artist.types';
import {groupTracksByArtist} from '@/utils/filters';
import {TrackWithPlaylist} from '@/types/TracksList.types';

export interface TracksState {
  tracks: Track[];
  artists: Artist[];
  favorites: TrackWithPlaylist[];
  toggleTrackFavorite: (track: TrackWithPlaylist) => void;
  setTracks: (tracks: Track[]) => void;
  fetchDeviceTracks: () => Promise<void>;
  // _hasHydrated: boolean;
}

export const createTracksSlice = (
  set: (fn: (state: TracksState) => Partial<TracksState>) => void,
): Omit<TracksState, '_hasHydrated'> => ({
  tracks: [],
  artists: [],
  favorites: [],
  setTracks: tracks =>
    set(() => ({
      tracks,
    })),
  fetchDeviceTracks: async () => {
    try {
      const deviceTracks = await getMusicFiles();
      console.log(`Fetched ${deviceTracks.length} tracks from device.`);
      set(() => ({tracks: deviceTracks}));
      set(() => ({artists: groupTracksByArtist(deviceTracks)}));
    } catch (error) {
      console.error('Failed to fetch device tracks:', error);
    }
  },
  toggleTrackFavorite: (track: TrackWithPlaylist) =>
    set(state => {
      const trackIndex = state.favorites.findIndex(t => t.url === track.url);
      if (trackIndex === -1) state.favorites.push(track);
      else state.favorites.splice(trackIndex, 1);
      return {favorites: state.favorites};
    }),
});
