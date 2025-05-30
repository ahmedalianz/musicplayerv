import {Image} from 'react-native';
import unknownArtistSource from '../../assets/images/unknown_artist.webp';
import unknownTrackSource from '../../assets/images/unknown_track.webp';
// import playingSource from '../../assets/images/playing.gif';
import playingSource from '../../assets/images/playing2.gif';
const unknownArtist = Image.resolveAssetSource(unknownArtistSource).uri;
const unknownTrack = Image.resolveAssetSource(unknownTrackSource).uri;
const playing = Image.resolveAssetSource(playingSource).uri;
const images = {
  unknownArtist,
  unknownTrack,
  unknownTrackSource,
  playing,
};
export default images;
