import {getAll} from '@kingfang007/react-native-get-music-files';
import requestStoragePermission from './requestStoragePermission';
import {TrackV} from '@/types/TracksList.types';

const getMusicFiles = async ({limit}: {limit?: number} = {}) => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    return [];
  }

  const rawTracks = await getAll({
    coverQuality: 50,
    limit: 50,
  });

  return Array.isArray(rawTracks) ? rawTracks.map(formatTrack) : [];
};
const getArtworkUri = (track: any) => {
  if (track.artworkUrl) {
    return track.artworkUrl;
  }
  if (!track.cover) {
    return null;
  }

  return track.cover.startsWith('data:image')
    ? track.cover
    : `data:image/jpeg;base64,${track.cover}`;
};
const formatTrack = (rawTrack: any): TrackV => ({
  id: `${rawTrack.url}_${rawTrack.title}`,
  url: rawTrack.path || rawTrack.url,
  title: rawTrack.title || 'Unknown Title',
  artist: rawTrack.artist || rawTrack.author || 'Unknown Artist',
  album: rawTrack.album || 'Unknown Album',
  duration: rawTrack.duration ?? 0,
  artwork: getArtworkUri(rawTrack),
});
export default getMusicFiles;
