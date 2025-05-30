import {TrackV} from '@/types/TracksList.types';

export interface PlaylistsState {
  playlists: Array<{
    playListId: number;
    playListName: string;
    tracks: TrackV[];
  }>;
  addTrackToPlaylist: (track: TrackV, playListId: number) => void;
  removeTrackFromPlaylist: (trackId: string, playListId: number) => void;
  createPlaylist: (playListName: string) => void;
  removePlaylist: (playListId: number) => void;
}

export const createPlaylistsState = (
  set: (fn: (state: PlaylistsState) => Partial<PlaylistsState>) => void
): PlaylistsState => ({
  playlists: [],
  addTrackToPlaylist: (track: TrackV, playListId: number) =>
    set(state => {
      const playlist = state.playlists.find(p => p.playListId === playListId);
      if (playlist) playlist.tracks.push(track);
      return {playlists: state.playlists};
    }),
  removeTrackFromPlaylist: (trackId: string, playListId: number) =>
    set(state => {
      const playlist = state.playlists.find(p => p.playListId === playListId);
      if (playlist) {
        const trackIndex = playlist.tracks.findIndex(t => t.id === trackId);
        playlist.tracks.splice(trackIndex, 1);
      }
      return {playlists: state.playlists};
    }),
  createPlaylist: (playListName: string) =>
    set(state => ({
      playlists: [
        ...state.playlists,
        {playListId: new Date().getTime(), playListName, tracks: []},
      ],
    })),
  removePlaylist: (playListId: number) =>
    set(state => ({
      playlists: state.playlists.filter(p => p.playListId !== playListId),
    })),
});
