import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
const MusicPlayer = () => {
  const {top, bottom} = useSafeAreaInsets();
  const activeTrack = useActiveTrack();
  const {isFavorite, toggleFavorite} = useTrackPlayerFavorite();
  return (
    <LinearGradient
      colors={[Colors.background, Colors.primary]}
      style={styles.linearGradient}>
      <View style={styles.overlayContainer}>
        <DismissPlayer />
        <View style={{flex: 1, paddingTop: top + 70, paddingBottom: bottom}}>
          <View style={styles.imageContainer}>
            <FastImage
              key={activeTrack?.artwork ?? Images.unknownTrack}
              source={{
                uri: activeTrack?.artwork ?? Images.unknownTrack,
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginTop: 'auto'}}>
              <View style={{height: 60}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {/* Track title */}
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={activeTrack?.title ?? ''}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>

                  {/* Favorite button icon */}
                  <Icon
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={20}
                    color={isFavorite ? Colors.primary : Colors.icon}
                    style={{marginHorizontal: 14}}
                    onPress={toggleFavorite}
                  />
                </View>

                {/* Track artist */}
                {activeTrack?.artist && (
                  <Text
                    numberOfLines={1}
                    style={[styles.trackArtistText, {marginTop: 6}]}>
                    {activeTrack?.artist}
                  </Text>
                )}
              </View>
              <PlayerProgressbar style={{marginTop: 32}} />

              <PlayerControls style={{marginTop: 40}} />
            </View>

            <PlayerVolumeBar style={{marginTop: 'auto', marginBottom: 30}} />

            <View style={Styles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{marginBottom: 6}} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  overlayContainer: {
    ...Styles.container,
    paddingHorizontal: 24,
    backgroundColor: Colors.lightBackground,
  },
  imageContainer: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11,
    height: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  trackTitleText: {
    ...Styles.text,
    fontSize: 22,
    fontWeight: '700',
  },
  trackArtistText: {
    ...Styles.text,
    fontSize: FontSize.base,
    opacity: 0.8,
    maxWidth: '90%',
  },
});
