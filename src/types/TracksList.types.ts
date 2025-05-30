import {ViewProps, ViewStyle} from 'react-native';
import {Track} from 'react-native-track-player';
export type TrackV = Track & {
  id: string;
};
export type TracksListItemProps = {
  track: TrackV;
  onTrackSelect: (track: TrackV) => void;
};
export type TracksListSearchProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};
export type TracksListProps = TracksListSearchProps & {
  id: string;
  tracks: TrackV[];
  hideQueueControls: boolean;
  title?: string;
  headerCustomStyle?: ViewStyle;
  AdditionalListHeader?: () => JSX.Element;
};

export type Playlist = {
  playListId: number;
  playListName: string;
  tracks: TrackV[];
  artworkPreview?: string;
};

export type QueueControlsProps = {
  tracks: TrackV[];
} & ViewProps;
