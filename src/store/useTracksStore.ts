import {Track} from 'react-native-track-player';
import library from '../../assets/data/library.json';

export interface TracksState {
  tracks: Track[];
}

export const createTracksSlice = (): TracksState => ({
  tracks: library,
});
