// import {groupTracksByPlaylist} from '@/utils/filters';
// import {Images} from '@/constants';
// import {Track} from 'react-native-track-player';

// export interface PlaylistsState {
//   playlists: any[];
//   addToPlaylist: (track: any) => void;
//   removeFromPlaylist: (trackId: string) => void;
// }

// export const createPlaylistsState = (
//   set: (fn: (state: PlaylistsState) => Partial<PlaylistsState>) => void,
// ): PlaylistsState => ({
//   playlists: groupTracksByPlaylist(library, Images.unknownTrack),
//   addToPlaylist: (track: any) =>
//     set(state => ({
//       playlists: [...state.playlists, track],
//     })),
//   removeFromPlaylist: (trackUrl: string) =>
//     set(state => ({
//       playlists: state.playlists.filter((t: Track) => t.url !== trackUrl),
//     })),
// });
