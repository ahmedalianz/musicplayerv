import {Artist} from '@/types/Artist.types';
import {Playlist} from '@/types/TracksList.types';
import {Track} from 'react-native-track-player';

export const trackTitleFilter = (title: string) => (track: Track) =>
  track.title?.toLowerCase().includes(title.toLowerCase());

export const artistNameFilter = (name: string) => (artist: Artist) =>
  artist.name.toLowerCase().includes(name.toLowerCase());

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
  playlist.name.toLowerCase().includes(name.toLowerCase());
export const groupTracksByArtist = (tracks: Track[]) => {
  const grouped: Record<string, Track[]> = {};

  for (const track of tracks) {
    const artistName = track?.artist || 'Unknown Artist';

    if (!grouped[artistName]) {
      grouped[artistName] = [];
    }

    grouped[artistName].push(track);
  }

  return Object.entries(grouped).map(([name, tracks]) => ({
    name,
    tracks,
  }));
};
export const groupTracksByPlaylist = (
  tracks: Track[],
  defaultArtwork: string,
): Playlist[] => {
  const playlistMap = new Map<string, Playlist>();

  for (const track of tracks) {
    if (!track.playlist) continue;

    for (const playlistName of track.playlist) {
      const existing = playlistMap.get(playlistName);

      if (existing) {
        existing.tracks.push(track);
      } else {
        playlistMap.set(playlistName, {
          name: playlistName,
          tracks: [track],
          artworkPreview: track.artwork ?? defaultArtwork,
        });
      }
    }
  }

  return Array.from(playlistMap.values());
};
