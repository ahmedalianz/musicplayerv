import {Colors, FontSize, Images, Styles} from '@/constants';
import {TracksListItemProps} from '@/types/TracksList.types';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LoaderKit from 'react-native-loader-kit';
import {useActiveTrack, useIsPlaying} from 'react-native-track-player';
// import Icon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {TrackShortcutsMenu} from './TrackListComponents';
import React from 'react';
const TracksListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TracksListItemProps) => {
  const {playing} = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;
  return (
    <View style={styles.trackItemContainer}>
      <TouchableHighlight
        style={{flex: 1}}
        onPress={() => handleTrackSelect(track)}
        accessibilityLabel={`Play ${track.title}`}
        accessibilityRole="button">
        <View style={styles.trackItemButton}>
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

          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                color={Colors.icon}
                name="LineScaleParty"
              />
            ) : (
              <IonIcon
                name="play"
                size={24}
                color={Colors.icon}
                style={styles.trackPausedIndicator}
              />
            ))}
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
      <View
        style={{
          paddingHorizontal: 5,
        }}>
        <TrackShortcutsMenu track={track}>
          {/* <Icon name="dots-three-horizontal" size={18} color={Colors.icon} /> */}
        </TrackShortcutsMenu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackItemButton: {
    columnGap: 14,
    flexDirection: 'row',
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
