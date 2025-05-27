import {TrackWithPlaylist} from './TracksList.types';

export interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleFavorite: (track: TrackWithPlaylist) => void;
  addToPlaylist: (track: TrackWithPlaylist, playlistName: string) => void;
}
