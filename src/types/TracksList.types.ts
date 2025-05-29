import {ViewProps, ViewStyle} from 'react-native';
import {Track} from 'react-native-track-player';

export type TracksListItemProps = {
  track: Track;
  onTrackSelect: (track: Track) => void;
};
export type TracksListSearchProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};
export type TracksListProps = TracksListSearchProps & {
  id: string;
  tracks: Track[];
  hideQueueControls: boolean;
  title?: string;
  headerCustomStyle?: ViewStyle;
  AdditionalListHeader?: () => JSX.Element;
};

export type Playlist = {
  name: string;
  tracks: Track[];
  artworkPreview: string;
};
export type TrackWithPlaylist = Track & {
  playlist?: string[];
};
export type QueueControlsProps = {
  tracks: Track[];
} & ViewProps;
