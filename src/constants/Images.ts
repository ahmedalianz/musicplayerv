import {Image} from 'react-native';
import unknownArtistSource from '../../assets/images/unknown_artist.png';
import unknownTrackSource from '../../assets/images/unknown_track.png';
const unknownArtist = Image.resolveAssetSource(unknownArtistSource).uri;
const unknownTrack = Image.resolveAssetSource(unknownTrackSource).uri;
const images = {
  unknownArtist,
  unknownTrack,
};
export default images;
