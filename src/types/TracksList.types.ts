import {Track} from 'react-native-track-player';

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};
export type TracksListProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};
export type Playlist = {
  name: string;
  tracks: Track[];
  artworkPreview: string;
};
export type TrackWithPlaylist = Track & {
  playlist?: string[];
};
