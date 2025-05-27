import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import React from 'react';
import {Images, Styles} from '@/constants';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useActiveTrack} from 'react-native-track-player';
import {PlayPauseButton, SkipButton} from './PlayerControls';
import MovingText from './MovingText';
import {useLastActiveTrack} from '@/hooks';

const FloatingPlayer = ({style}: ViewProps) => {
  const navigation = useNavigation();

  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handlePress = () => {
    // navigation.navigate('/player')
  };

  if (!displayedTrack) return null;
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={[styles.container, style]}>
      <>
        <FastImage
          source={{
            uri: displayedTrack.artwork ?? Images.unknownTrack,
          }}
          style={styles.trackArtworkImage}
        />

        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitle}
            text={displayedTrack.title ?? ''}
            animationThreshold={25}
          />
        </View>

        <View style={styles.trackControlsContainer}>
          <PlayPauseButton iconSize={24} />
          <SkipButton type="next" iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  trackTitle: {
    ...Styles.text,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
