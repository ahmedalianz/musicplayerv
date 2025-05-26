import {Track} from 'react-native-track-player';

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};
export type TracksListProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};
