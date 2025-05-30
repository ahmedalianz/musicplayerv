import {Artist} from '@/types/Artist.types';
import {Playlist, TrackV} from '@/types/TracksList.types';

export const trackTitleFilter = (title: string) => (track: TrackV) =>
  track.title?.toLowerCase().includes(title.toLowerCase());

export const artistNameFilter = (name: string) => (artist: Artist) =>
  artist.name.toLowerCase().includes(name.toLowerCase());

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
  playlist.playListName.toLowerCase().includes(name.toLowerCase());
export const groupTracksByArtist = (tracks: TrackV[]) => {
  const grouped: Record<string, TrackV[]> = {};

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
