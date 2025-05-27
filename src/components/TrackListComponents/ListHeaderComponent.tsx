import {Colors, Styles} from '@/constants';
import {TracksListProps} from '@/types/TracksList.types';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  CurvedTransition,
  Extrapolation,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
type ListHeaderComponentProps = {
  scrollY: SharedValue<number>;
} & TracksListProps;
const ListHeaderComponent = ({
  scrollY,
  searchQuery,
  setSearchQuery,
}: ListHeaderComponentProps) => {
  const ITEM_HEIGHT = 50;
  const SCROLL_THRESHOLD = 3 * (ITEM_HEIGHT + 10);
  const [searchFocused, setSearchFocused] = useState(false);
  const headerStyle = useAnimatedStyle<TextStyle>(() => ({
    fontSize: interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [30, 20],
      Extrapolation.CLAMP,
    ),
    fontWeight: interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      ['600', '400'],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [1, 0.8],
      Extrapolation.CLAMP,
    ),
  }));
  const headerContainerStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, SCROLL_THRESHOLD],
          [0, -5],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));
  const searchBarStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, SCROLL_THRESHOLD],
          [0, -10],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [1, 0.9],
      Extrapolation.CLAMP,
    ),
  }));
  const transition = CurvedTransition.delay(100);
  const inputRef = React.useRef<TextInput>(null);
  return (
    <Animated.View style={styles.headerContainer} layout={transition}>
      {!searchFocused && (
        <Animated.View style={headerContainerStyle}>
          <Animated.Text
            entering={FadeInUp.delay(100)}
            style={[styles.text, headerStyle]}>
            Songs
          </Animated.Text>
        </Animated.View>
      )}
      <Animated.View style={[styles.searchContainer, searchBarStyle]}>
        <TextInput
          key={'search-input'}
          style={styles.searchInput}
          placeholder="Search songs..."
          placeholderTextColor={Colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          ref={inputRef}
        />
        {searchFocused && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  setSearchQuery('');
                  Keyboard.dismiss();
                  inputRef.current?.blur();
                }, 100);
              }}>
              <Text style={Styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 16,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  text: {
    fontSize: 30,
    color: Colors.text,
  },
  searchContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: Colors.text,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 16,
    flexGrow: 1,
  },
});
export default ListHeaderComponent;
