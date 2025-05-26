import {Colors, Styles, FontSize, Images} from '@/constants';
import {TracksListItemProps} from '@/types/TracksList.types';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const TracksListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TracksListItemProps) => {
  const isActiveTrack = false;
  return (
    <TouchableHighlight
      onPress={() => handleTrackSelect(track)}
      accessibilityLabel={`Play ${track.title}`}
      accessibilityRole="button">
      <View style={styles.trackItemContainer}>
        <FastImage
          source={{
            uri: track.artwork ?? Images.unknownTrack,
            priority: FastImage.priority.normal,
          }}
          style={{
            ...styles.trackArtworkImage,
            opacity: isActiveTrack ? 0.6 : 1,
          }}
        />

        <View style={styles.trackInfoContainer}>
          <View style={{width: '100%'}}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? Colors.primary : Colors.text,
              }}>
              {track.title}
            </Text>

            {track.artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {track.artist}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingRight: 20,
  },
  trackPlayingIconIndicator: {
    position: 'absolute',
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIndicator: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackTitleText: {
    ...Styles.text,
    fontSize: FontSize.sm,
    fontWeight: '600',
    maxWidth: '90%',
  },
  trackArtistText: {
    ...Styles.text,
    color: Colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});
export default TracksListItem;
