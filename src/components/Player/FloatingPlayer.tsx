import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Colors, Images, Styles} from '@/constants';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useActiveTrack} from 'react-native-track-player';
import {PlayPauseButton, SkipButton} from './PlayerControls';
import MovingText from './MovingText';
import {useLastActiveTrack} from '@/hooks';
import {InScreenNavigation} from '@/types/Navigation.types';

const FloatingPlayer = ({style}: ViewProps) => {
  const navigation = useNavigation<InScreenNavigation>();
  const activeTrack = useActiveTrack();
  const {lastActiveTrack} = useLastActiveTrack();

  const displayedTrack = useMemo(
    () => activeTrack ?? lastActiveTrack,
    [activeTrack, lastActiveTrack]
  );

  useEffect(() => {
    if (displayedTrack?.artwork) {
      FastImage.preload([{uri: displayedTrack.artwork}]);
    }
  }, [displayedTrack?.artwork]);

  const handlePress = () => {
    navigation.navigate('MusicPlayer');
  };

  if (!displayedTrack) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={[styles.container, style]}>
      <FastImage
        source={{
          uri: displayedTrack.artwork ?? Images.unknownTrack,
          priority: FastImage.priority.normal,
        }}
        defaultSource={Images.unknownTrackSource}
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
    </TouchableOpacity>
  );
};

export default React.memo(FloatingPlayer);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blackContainer,
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
