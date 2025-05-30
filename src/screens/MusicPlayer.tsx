import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';
import {Colors, FontSize, Images, Styles} from '@/constants';
import {
  DismissPlayer,
  PlayerProgressbar,
  PlayerRepeatToggle,
  PlayerVolumeBar,
} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {useActiveTrack} from 'react-native-track-player';
import MovingText from '@/components/Player/MovingText';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTrackPlayerFavorite} from '@/hooks';
import {PlayerControls} from '@/components/Player/PlayerControls';

const MusicPlayer = () => {
  const {top, bottom} = useSafeAreaInsets();
  const activeTrack = useActiveTrack();
  const spinAnim = useRef(new Animated.Value(0)).current;
  const {isFavorite, toggleFavorite} = useTrackPlayerFavorite();

  const {title, artist, artwork} = useMemo(
    () => ({
      title: activeTrack?.title ?? '',
      artist: activeTrack?.artist ?? '',
      artwork: activeTrack?.artwork ?? Images.unknownTrack,
    }),
    [activeTrack]
  );

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <FastImage
        source={{uri: artwork}}
        style={styles.backgroundImage}
        blurRadius={10}
      />
      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <DismissPlayer />

        <View
          style={[
            styles.mainContent,
            {paddingTop: top + 40, paddingBottom: bottom},
          ]}>
          {/* Vinyl record with rotating animation */}
          <View style={styles.vinylContainer}>
            <Animated.View
              style={[styles.vinyl, {transform: [{rotate: spin}]}]}>
              <FastImage
                source={{uri: artwork}}
                style={styles.vinylImage}
                resizeMode="cover"
              />
              <View style={styles.vinylCenter} />
            </Animated.View>
          </View>

          {/* Track info and controls */}
          <View style={styles.infoContainer}>
            <View style={styles.trackHeader}>
              <View style={styles.trackTitleContainer}>
                <MovingText
                  text={title}
                  animationThreshold={30}
                  style={styles.trackTitleText}
                />
              </View>

              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? Colors.primary : Colors.icon}
                onPress={toggleFavorite}
              />
            </View>

            {artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {artist}
              </Text>
            )}

            <PlayerProgressbar style={styles.progressBar} />
            <PlayerControls style={styles.controls} />
            <PlayerVolumeBar style={styles.volumeBar} />
            <View style={Styles.centeredRow}>
              <PlayerRepeatToggle size={26} style={styles.mb6} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.lightBackground,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  mainContent: {
    flex: 1,
  },
  vinylContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  vinyl: {
    width: 260,
    height: 260,
    borderRadius: 140,
    backgroundColor: Colors.veryLightBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.background,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  vinylImage: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  vinylCenter: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.minimumTrackTintColor,
    borderWidth: 8,
    borderColor: Colors.lightBackground,
    opacity: 0.7,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  trackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginRight: 16,
  },
  trackTitleText: {
    ...Styles.text,
    fontSize: 24,
    fontWeight: '700',
  },
  trackArtistText: {
    ...Styles.text,
    fontSize: FontSize.base,
    opacity: 0.8,
    marginBottom: 32,
  },
  progressBar: {
    marginBottom: 40,
  },
  controls: {
    marginBottom: 30,
  },
  volumeBar: {
    marginBottom: 20,
  },
  mb6: {
    marginBottom: 6,
  },
});

export default MusicPlayer;
