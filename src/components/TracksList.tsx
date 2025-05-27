import {Images, Styles} from '@/constants';
import React, {useRef} from 'react';
import {FlatList, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {
  ItemSeparatorComponent,
  ListEmptyComponent,
  ListHeaderComponent,
} from './TrackListComponents';
import TrackListItem from './TrackListItem';
import {TracksListProps} from '@/types/TracksList.types';
import TrackPlayer, {Track} from 'react-native-track-player';
type MergedTracksListProps = TracksListProps & {filteredTracks: Track[]};
const TracksList = ({
  searchQuery,
  setSearchQuery,
  filteredTracks,
}: MergedTracksListProps) => {
  const ITEM_HEIGHT = 50;

  const renderItem = ({item}: {item: any}) => (
    <TrackListItem
      track={item}
      onTrackSelect={async (track: Track) => {
        await TrackPlayer.load(track);
        await TrackPlayer.play();
      }}
    />
  );

  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View>
      <ListHeaderComponent {...{scrollY, searchQuery, setSearchQuery}} />
      <Animated.FlatList
        skipEnteringExitingAnimations
        ref={flatListRef}
        data={filteredTracks}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item.url}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={Styles.flatLstBottom}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TracksList;
