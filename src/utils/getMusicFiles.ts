import {getAll} from '@kingfang007/react-native-get-music-files'; // Or from 'react-native-get-music-files'
import requestStoragePermission from './requestStoragePermission';

const getMusicFiles = async () => {
  const hasPermission = await requestStoragePermission(); // Call the permission function from step 1
  if (!hasPermission) {
    return;
  }

  try {
    const rawDeviceTracks = await getAll({
      coverQuality: 50,
      limit: 100,
    });

    const formattedTracks = rawDeviceTracks?.map(rawTrack => {
      let artworkUri = null;

      if (rawTrack.cover && typeof rawTrack.cover === 'string') {
        if (rawTrack.cover.startsWith('data:image')) {
          artworkUri = rawTrack.cover;
        } else {
          artworkUri = `data:image/jpeg;base64,${rawTrack.cover}`;
        }
      } else if (rawTrack.artworkUrl) {
        artworkUri = rawTrack.artworkUrl;
      }

      return {
        id: rawTrack?.url + rawTrack?.title,
        url: rawTrack?.path || rawTrack?.url,
        title: rawTrack?.title || 'Unknown Title',
        artist: rawTrack?.artist || rawTrack?.author || 'Unknown Artist',
        album: rawTrack?.album || 'Unknown Album',
        duration: rawTrack?.duration ?? 0,
        artwork: artworkUri,
      };
    });
    return formattedTracks;
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
};
export default getMusicFiles;
